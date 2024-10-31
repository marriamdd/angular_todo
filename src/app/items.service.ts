import { inject, Injectable } from '@angular/core';
import { Items } from './item.model';
@Injectable({ providedIn: 'root' })
export class ItemsService {
  items: Items[] = [
    { description: 'bebos davurekos', done: false },
    { description: 'vuyuro pilms', done: false },
    { description: 'avago aplikacia', done: true },
  ];
  addItem(newDesc: string) {
    this.items.unshift({ description: newDesc, done: false });
  }
  deleteItem(index: number) {
    this.items.splice(index, 1);
  }
}
