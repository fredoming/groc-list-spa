import { Injectable } from '@angular/core';
import { EdmV4, PlainODataResponse } from '@odata/client';
import { GroceryList } from '../models/enities/entities';
import { BaseStoreService } from './base/base.service';

@Injectable({
  providedIn: 'root'
})
export class ListStoreService extends BaseStoreService<GroceryList> {

  constructor() { 
    super();
    this.entity = 'GroceryLists' 
    this.init();
  }

  getAll(): void {
  }

}
