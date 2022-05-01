import { Component, HostListener, Input, OnInit } from '@angular/core';
import { GroceryItem, GroceryList } from 'src/app/models/enities/entities';
import { ListStoreService } from 'src/app/services/list-store.service';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import {IconDefinition} from '@fortawesome/fontawesome-common-types'
@Component({
  selector: 'grocls-list-starter',
  templateUrl: './list-starter.component.html',
  styleUrls: ['./list-starter.component.scss']
})
export class ListStarterComponent implements OnInit {
  //load font-awesome icons
  faPlus: IconDefinition = faPlus;
  faFloppyDisk: IconDefinition = faFloppyDisk;

  @Input('grocerylist') grocerylist!: GroceryList;
  GroceryListName!: string; 

  //TODO: move this to a service
  listHasStarted: boolean = false;

  items?: GroceryItem [] = [];
  
  get isNew(): boolean {
    if(this.grocerylist)
      return false
    return true
  }

  get newItem(): GroceryItem {
    return { ItemName: ''}
  }

  get newList(): GroceryList {
    return {
      Name: this.GroceryListName,
      GroceryItems: this.items,
      UserId: this.userId
    }
  }
  get userId(): string {
    return '3fa85f64-5717-4562-b3fc-2c963f66afa6'
  }
  constructor(private listStore: ListStoreService) {
    console.log(this.grocerylist)
   }

  ngOnInit(): void {
    if(this.isNew)
      this.items?.push(this.newItem)
  }

  addNewItem(): void {
    this.items?.push(this.newItem)
  }

  saveList(): void {
    this.listStore.create(this.newList).subscribe({
      next: () => {
        this.listHasStarted = false
        this.GroceryListName = ''
        this.items = []
      }
    });
  }

  focusOut() {
    console.log('should save')
    const newList: GroceryList = {
      Name: this.GroceryListName,
      UserId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      CreatedDT: new Date(),
      CreatedById: '',
      CreatedByName: '',
      LastModifiedDT: new Date(),
      LastModifiedById: '',
      LastModifiedByName: ''
    }
    this.listStore.create(newList)
  }

  @HostListener('document:keydown.enter', ['$event']) onEnterdownHandler(event: KeyboardEvent) {
    this.addNewItem()
  }

  @HostListener('document:keydown.tab', ['$event']) onTabdownHandler(event: KeyboardEvent) {
    console.log(event);
  }
}
