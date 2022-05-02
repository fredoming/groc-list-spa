import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, Observable, of, tap } from 'rxjs';
import { GroceryItem, GroceryList } from '../models/enities/entities';
import { ListStoreService } from './list-store.service';

@Injectable({
  providedIn: 'root'
})
export class ListStarterService {

  GroceryListName!: string;
  listHasStarted: boolean = false;

  constructor(private listStore: ListStoreService) { }

  get grocerylist(): GroceryList | null {
    return this.selectedSubject.getValue()
  }

  get name(): string {
    if (this.grocerylist)
      if (this.grocerylist.Name)
        return this.grocerylist.Name
    return ''
  }

  get id(): string {
    const id = this.grocerylist?.GroceryListId
    if (id)
      return id
    return ''
  }

  get items(): GroceryItem[] {
    if (this.grocerylist?.GroceryItems)
      return this.grocerylist?.GroceryItems
    return []
  }

  selectedSubject = new BehaviorSubject<GroceryList | null>(null);
  get selectedListt$(): Observable<GroceryList | null> {
    return this.selectedSubject.asObservable().pipe(filter(c => !!c))
  }

  get isNew(): boolean {
    if (this.grocerylist)
      return false
    return true
  }

  get newItem(): GroceryItem {
    return { ItemName: '' }
  }


  get userId(): string {
    return '3fa85f64-5717-4562-b3fc-2c963f66afa6'
  }

  saveNewList(newList: GroceryList): Observable<GroceryList> {
    return this.listStore.create(newList).pipe(tap({
      next: (res: GroceryList) => {
        this.reset()
      }
    }))
  }

  updateList(list: GroceryList): Observable<void> {
    return this.listStore.update(this.id, list).pipe(tap({
      next: () => {
        this.reset()
      }
    }))
  }

  reset(): void {
    this.listHasStarted = false
    this.selectedSubject.next(null)
  }
}
