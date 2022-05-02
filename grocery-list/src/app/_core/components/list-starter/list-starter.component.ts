import { Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { GroceryItem, GroceryList } from 'src/app/models/enities/entities';
import { ListStoreService } from 'src/app/services/list-store.service';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import {IconDefinition} from '@fortawesome/fontawesome-common-types'
import { ListStarterService } from 'src/app/services/list-starter.service';
@Component({
  selector: 'grocls-list-starter',
  templateUrl: './list-starter.component.html',
  styleUrls: ['./list-starter.component.scss']
})
export class ListStarterComponent implements OnInit {
  //load font-awesome icons
  faPlus: IconDefinition = faPlus;
  faFloppyDisk: IconDefinition = faFloppyDisk;

  GroceryListName!: string;
  items?: GroceryItem [] = [];
  listHasStarted: boolean = false;

  @ViewChild('trigger') trigger: any;

  constructor(
    private listStore: ListStoreService,
    private lsStarter: ListStarterService) {
      this.listenForList()
   }
   get newList(): GroceryList {
    return {
      Name: this.GroceryListName,
      GroceryItems: this.items,
      UserId: this.lsStarter.userId
    }
  }
  ngOnInit(): void {
    if(this.lsStarter.isNew)
      this.items?.push(this.lsStarter.newItem)
  }

  saveList(): void {
    if(this.lsStarter.isNew){
      this.lsStarter.saveNewList(this.newList).subscribe({
        next: (success) => {
          if(success) console.log('Saved new List!')
          this.items = []
          this.GroceryListName = ''
          this.listHasStarted = false
          this.listStore.loadall()
        }
      })
    }
    else {
      this.lsStarter.updateList();
    }


  }

  hookUpToService() {
    this.GroceryListName = this.lsStarter.name
    this.items = this.lsStarter.items
    this.listHasStarted = this.lsStarter.listHasStarted
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

  listenForList(){
    this.lsStarter.selectedListt$.subscribe({
      next: (list: GroceryList | null) => {        
        this.hookUpToService()
        console.log(this, list)
      }
    })
  }

  addNewItem(): void {
    this.items?.push(this.lsStarter.newItem)
  }

  @HostListener('document:keydown.enter', ['$event']) onEnterdownHandler(event: KeyboardEvent) {
    this.addNewItem()
  }

  @HostListener('document:keydown.tab', ['$event']) onTabdownHandler(event: KeyboardEvent) {
    console.log(event);
  }
}
