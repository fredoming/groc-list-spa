import { Component, OnInit } from '@angular/core';
import { GroceryItem } from 'src/app/models/enities/entities';

@Component({
  selector: 'grocls-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  
  items?: GroceryItem [] = [ { ItemName: "item1", DoneTF: false, GroceryItemId: "", CreatedDT: new Date(), CreatedById: null, CreatedByName: "", LastModifiedById:"", LastModifiedByName:"", LastModifiedDT:new Date() },
  { ItemName: "item1", DoneTF: false, GroceryItemId: "", CreatedDT: new Date(), CreatedById: null, CreatedByName: "", LastModifiedById:"", LastModifiedByName:"", LastModifiedDT:new Date() }]; 

  constructor() { }

  ngOnInit(): void {
  }

  addNewItem(): void {
    console.log(this.items);
    this.items?.push({ItemName: "item1", DoneTF: false, GroceryItemId: "", CreatedDT: new Date(), CreatedById: null, CreatedByName: "", LastModifiedById:"", LastModifiedByName:"", LastModifiedDT:new Date() });
  }
}
