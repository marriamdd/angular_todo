import { Component } from '@angular/core';
import { Items } from './item.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  items: Items[] = [
    { description: 'bebos davurekos', done: false },
    { description: 'vuyuro pilms', done: false },
    { description: 'avago aplikacia', done: true },
  ];
  onAddItem(newDesc: string) {
    this.items.unshift({ description: newDesc, done: false });
  }
}
