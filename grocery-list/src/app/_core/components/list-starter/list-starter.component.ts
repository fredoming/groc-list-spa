import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { GroceryItem, GroceryList } from 'src/app/models/enities/entities';
import { ListStoreService } from 'src/app/services/list-store.service';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-common-types'
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
  items?: GroceryItem[] = [];
  listHasStarted: boolean = false;

  @ViewChild('trigger') trigger: any;

  constructor(
    private listStore: ListStoreService,
    private lsStarter: ListStarterService,
    private elemRef: ElementRef) {
    this.listenForList()
  }
  get newList(): GroceryList {
    return {
      Name: this.GroceryListName,
      GroceryItems: this.items,
      UserId: this.lsStarter.userId
    }
  }

  get listNoItems(): GroceryList {
    return {
      Name: this.GroceryListName,
      UserId: this.lsStarter.userId,
    }
  }
  ngOnInit(): void {
    if (this.lsStarter.isNew)
      this.items?.push(this.lsStarter.newItem)
  }

  saveList(): void {
    if (this.lsStarter.isNew) {
      this.lsStarter.saveNewList(this.newList).subscribe({
        next: (success) => {
          this.reset()         
          this.listStore.loadall()
        }
      })
    }
    else {
      this.lsStarter.updateList(this.listNoItems).subscribe({
        next: () => {
          this.reset()
        }
      })
    }


  }

  hookUpToService() {
    this.GroceryListName = this.lsStarter.name
    this.items = this.lsStarter.items
    this.listHasStarted = this.lsStarter.listHasStarted
  }

  listenForList() {
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

  reset(): void {
    this.items = []
    this.GroceryListName = ''
    this.listHasStarted = false
  }

  @HostListener('document:keydown.enter', ['$event']) onEnterdownHandler(event: KeyboardEvent) {
    this.addNewItem()
  }

  // @HostListener('document:click', ['$event']) clickout(event: any) {
  //   console.log(event);
  //   if(!this.elemRef.nativeElement.contains(event.target)){
  //     this.items = []
  //     this.GroceryListName = ''
  //     this.listHasStarted = false
  //   }
  // }
}
