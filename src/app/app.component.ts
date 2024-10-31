import { Items } from './item.model';

import { Component, OnInit } from '@angular/core';
import { ItemsService } from './items.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  items: Items[];
  constructor(private ItemsService: ItemsService) {}
  ngOnInit() {
    this.items = this.ItemsService.getItems();
  }
}
