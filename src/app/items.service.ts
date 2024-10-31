import { inject, Injectable } from '@angular/core';
import { Items } from './item.model';
@Injectable({ providedIn: 'root' })
export class ItemsService {
  items: Items[] = [
    { description: 'bebos davurekos', done: false },
    { description: 'vuyuro pilms', done: false },
    { description: 'avago aplikacia', done: true },
  ];

  private saveItems() {
    localStorage.setItem('todos', JSON.stringify(this.items));
  }

  getItems() {
    const todos = localStorage.getItem('todos');
    if (todos) {
      this.items = JSON.parse(todos);
    }
    return this.items;
  }
  addItem(newDesc: string) {
    this.items.unshift({ description: newDesc, done: false });
    this.saveItems();
  }
  deleteItem(index: number) {
    this.items.splice(index, 1);
    this.saveItems();
  }
  finishItem(index: number) {
    this.items[index].done = !this.items[index].done;
    this.saveItems();
  }
}
