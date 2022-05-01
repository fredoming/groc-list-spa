// import { Component, Input, OnInit } from '@angular/core';
// import { GroceryItem, GroceryList } from 'src/app/models/enities/entities';
// import { ListStoreService } from 'src/app/services/list-store.service';

// import { faPlus } from '@fortawesome/free-solid-svg-icons';

// import {IconDefinition} from '@fortawesome/fontawesome-common-types'
// @Component({
//   selector: 'grocls-list',
//   templateUrl: './list.component.html',
//   styleUrls: ['./list.component.scss']
// })
import { Component, Input, OnInit } from '@angular/core';
import { GroceryList } from 'src/app/models/enities/entities';

@Component({
  selector: 'grocls-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input('list') list!: GroceryList;
  constructor() { }

  ngOnInit(): void {
  }

}
