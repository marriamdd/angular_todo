import { Injectable } from '@angular/core';
import { Items } from './item.model';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';
import { Observable, Subject, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ItemsService {
  items: Items[] = [];
  baseUrl = environment.baseUrl;
  itemsUpdated = new Subject<Items[]>();

  constructor(private httpClient: HttpClient) {}

  private saveItems() {
    localStorage.setItem('todos', JSON.stringify(this.items));
  }

  getItems(): Observable<Items[]> {
    return this.httpClient
      .get<{ [key: string]: Items }>(`${this.baseUrl}todos.json`)
      .pipe(
        map((response) => {
          if (response) {
            const todoArray: Items[] = [];
            for (let key in response) {
              todoArray.unshift({ ...response[key], key });
            }
            return todoArray;
          } else {
            return [];
          }
        }),
        tap((items) => {
          this.items = items;
        })
      );
  }

  addItem(newDesc: string) {
    const newItem = {
      description: newDesc,
      done: false,
    };

    this.httpClient
      .post<{ name: string }>(`${this.baseUrl}todos.json`, newItem)
      .pipe(
        tap((response) => {
          if (response) {
            this.items.unshift({ ...newItem, key: response.name });
            this.itemsUpdated.next(this.items);
          }
        })
      )
      .subscribe((response) => {
        console.log('Item added:', response);
      });
  }

  deleteItem(key: string) {
    this.httpClient
      .delete(`${this.baseUrl}todos/${key}.json`)
      .pipe(
        tap(() => {
          this.items = this.items.filter((item) => item.key !== key);
          this.itemsUpdated.next(this.items);
          this.saveItems();
        }),
        catchError((error) => {
          console.error('Error deleting item', error);
          return of(null);
        })
      )
      .subscribe((response) => {
        console.log('Item deleted:', response);
      });
  }
  finishItem(key: string) {
    const itemIndex = this.items.findIndex((item) => item.key === key);
    if (itemIndex === -1) {
      console.error('Item not found');
      return;
    }

    this.items[itemIndex].done = !this.items[itemIndex].done;

    const updatedItem = { done: this.items[itemIndex].done };

    this.httpClient
      .patch(`${this.baseUrl}todos/${key}.json`, updatedItem)
      .subscribe(
        (response) => {
          console.log('Item updated:', response);
          this.itemsUpdated.next(this.items);
          this.saveItems();
        },
        (error) => {
          console.error('Error updating item', error);
        }
      );
  }
}
