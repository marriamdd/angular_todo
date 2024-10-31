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

  getItems(): Observable<Items[]> {
    return this.httpClient
      .get<{ [key: string]: Items }>(`${this.baseUrl}todos.json`)
      .pipe(
        map((response) => {
          if (response) {
            const todoArray: Items[] = [];
            for (let key in response) {
              if (response[key].description) {
                todoArray.unshift({ ...response[key], key });
              }
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

    return this.httpClient
      .post<{ name: string }>(`${this.baseUrl}todos.json`, newItem)
      .pipe(
        tap((response) => {
          if (response) {
            this.items.unshift({ ...newItem, key: response.name });
            this.itemsUpdated.next(this.items);
          }
        })
      );
  }

  deleteItem(key: string) {
    return this.httpClient.delete(`${this.baseUrl}todos/${key}.json`).pipe(
      tap(() => {
        const itemIndex = this.items.map((item) => item.key).indexOf(key);
        this.items.splice(itemIndex, 1);
        this.itemsUpdated.next(this.items);
      }),
      catchError((error) => {
        console.error('Error deleting item', error);
        return of(null);
      })
    );
  }
  updateItem(item: Items) {
    return this.httpClient
      .patch(`${this.baseUrl}todos/${item.key}.json`, {
        description: item.description,
        done: item.done,
      })
      .pipe(
        tap(() => {
          const itemIndex = this.items
            .map((item) => item.key)
            .indexOf(item.key);
          this.items[itemIndex] = item;
          this.itemsUpdated.next(this.items);
        })
      );
  }
}
