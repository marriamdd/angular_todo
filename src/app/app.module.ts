import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { ItemComponent } from './item/item.component';
@NgModule({
  declarations: [AppComponent, ItemComponent],
  imports: [BrowserModule, CommonModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
