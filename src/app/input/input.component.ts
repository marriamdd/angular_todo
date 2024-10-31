import { ItemsService } from './../items.service';
import { Component, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {
  constructor(private ItemsService: ItemsService) {}
  ngOnInit(): void {}
  onNewItem(input: HTMLInputElement) {
    console.log(input.value);
    this.ItemsService.addItem(input.value);
    input.value = '';
  }
}
