import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {
  @Output() newItem: EventEmitter<string> = new EventEmitter();
  constructor() {}
  ngOnInit(): void {}
  onNewItem(input: HTMLInputElement) {
    console.log(input.value);
    this.newItem.emit(input.value);
    input.value = '';
  }
}
