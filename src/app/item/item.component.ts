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

  constructor(private ItemsService: ItemsService) {}
  onDeleteItem() {
    this.ItemsService.deleteItem(this.item.key).subscribe((response) =>
      console.log(response)
    );
  }
  onItemDone() {
    this.ItemsService.updateItem({
      ...this.item,
      done: !this.item.done,
    }).subscribe();
  }
}
