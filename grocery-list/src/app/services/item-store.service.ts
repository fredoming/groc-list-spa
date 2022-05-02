import { Injectable } from '@angular/core';
import { GroceryItem } from '../models/enities/entities';
import { BaseStoreService } from './base/base.service';
import { ListStarterService } from './list-starter.service';

@Injectable({
  providedIn: 'root'
})
export class ItemStoreService extends BaseStoreService<GroceryItem> {

  constructor(private lsStarter: ListStarterService) { 
    super();
    this.entity = 'GroceryItems' 
    this.init()
  }

  save(item: GroceryItem) {
    console.log('save item: ', item)
    if(item.GroceryItemId) {
      this.update(item.GroceryItemId, item).subscribe({
        next: () => {
          console.log('after update')
        }
      })
    }
    else {
      console.log('else')
      item.GroceryListId = this.lsStarter.id
      this.create(item).subscribe({
        next: (res) => {
          console.log(res)
        }
      })
    }
  }
}
