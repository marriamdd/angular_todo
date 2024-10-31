import { ItemsService } from './../items.service';
import { Component, input, Input, Output } from '@angular/core';
import { Items } from '../item.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.componnet.css'],
})
export class ItemComponent {
  @Input() item: Items;
  @Input() itemIndex: number;
  constructor(private ItemsService: ItemsService) {}
  onDeleteItem() {
    this.ItemsService.deleteItem(this.itemIndex);
  }
  onItemDone() {
    this.ItemsService.finishItem(this.itemIndex);
  }
}
