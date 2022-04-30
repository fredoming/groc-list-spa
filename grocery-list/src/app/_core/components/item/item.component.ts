import { Component, Input, OnInit } from '@angular/core';
import { GroceryItem } from 'src/app/models/enities/entities';

@Component({
  selector: 'grocls-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  @Input('item') item!: GroceryItem 

  constructor() { }

  ngOnInit(): void {

  }

}
