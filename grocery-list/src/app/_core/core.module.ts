import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemComponent } from './components/item/item.component';
import { ListComponent } from './components/list/list.component';



@NgModule({
  declarations: [
    ItemComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ItemComponent,
    ListComponent
  ]
})
export class CoreModule { }
