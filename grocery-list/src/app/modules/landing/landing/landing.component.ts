import { Component, OnInit } from '@angular/core';
import { GroceryList } from 'src/app/models/enities/entities';
import { ListStoreService } from 'src/app/services/list-store.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'grocl-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  Lists!: GroceryList [];
  constructor(private listStore: ListStoreService) {
    console.log(environment.odataUri)
   }

  ngOnInit(): void {
    this.listStore.entitySet.newParam().expand("GroceryItems")
    this.listStore.expandables = 'GroceryItems'
    this.listStore.loadall()
    this.listenForLists()
  }
  
  listenForLists(): void {
    this.listStore.all$.subscribe({
      next: (lists: GroceryList [] | null) => {
        if(lists)
          this.Lists = lists;
      }
    })
  }
  focusOut():void {
    console.log('should save now')
  }
}
