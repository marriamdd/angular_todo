import { Items } from './item.model';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ItemsService } from './items.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  items: Items[];
  itemsUpdated = new Subscription();
  constructor(private ItemsService: ItemsService) {}
  ngOnInit() {
    this.ItemsService.getItems().subscribe((response) => {
      console.log(response);
      this.items = response;
    });
    this.itemsUpdated = this.ItemsService.itemsUpdated.subscribe((items) => {
      this.items = items;
    });
  }
  ngOnDestroy(): void {
    this.itemsUpdated.unsubscribe();
  }
}
