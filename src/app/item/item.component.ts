import { Component, Input, Output } from '@angular/core';
import { Items } from '../item.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.componnet.css'],
})
export class ItemComponent {
  @Input() item: Items;
  removeItem(item) {
    console.log(item);
  }
}
