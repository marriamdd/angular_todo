import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  items = [
    { description: 'bebos davurekos', done: false },
    { description: 'vuyuro pilms', done: false },
    { description: 'avago aplikacia', done: true },
  ];
  name = 'mari';
  cubeClass = 'blue-cube';
}
