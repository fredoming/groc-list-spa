import { Component, HostListener, Input, OnInit } from '@angular/core';
import { GroceryItem } from 'src/app/models/enities/entities';
import { ItemStoreService } from 'src/app/services/item-store.service';
import { ListStarterService } from 'src/app/services/list-starter.service';

@Component({
  selector: 'grocls-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  @Input('item') item!: GroceryItem 
  

  constructor(
    private lsStarter: ListStarterService,
    private itemStore: ItemStoreService) { }

  ngOnInit(): void {

  }

  focusOut() {
    if(!this.lsStarter.isNew) {
      this.itemStore.save(this.item)
    }
    console.log('item should save', this.item)
  }

}
