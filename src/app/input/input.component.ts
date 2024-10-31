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
    if (input.value.length > 0) {
      this.ItemsService.addItem(input.value.trim());
    }

    input.value = '';
  }
}
