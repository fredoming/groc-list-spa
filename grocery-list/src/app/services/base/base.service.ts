
import { OData, param, PlainODataResponse } from "@odata/client"
import { EntitySet } from "@odata/client/lib/entityset";
import { ODataV4 } from "@odata/client/lib/types_v4";
import { BehaviorSubject, filter, from, Observable } from "rxjs";
import { GroceryList } from "src/app/models/enities/entities";
import { environment } from "src/environments/environment";




export abstract class BaseStoreService<T> {
  key!: string;
  dataStore!: any;
  url: string = environment.odataUri;
  entity!: string;
  client!: ODataV4
  entitySet!: EntitySet<T>


   currentSubject = new BehaviorSubject<T | null>(null);
    get current$(): Observable<T | null> {
        return this.currentSubject.asObservable().pipe(filter(c => !!c))
    }


  constructor() { 

  }

  init() {
    this.client = OData.New4({ metadataUri: this.url})
    this.entitySet = this.client.getEntitySet<T>(this.entity);
  }

  byKey(keyname: string, key: string) {
    const filter = this.entitySet.newParam().filter(`${keyname} eq ${key}`)
    from(this.entitySet.query(filter)).subscribe({
      next: (list: T []) => {
        if(list.length == 1){
          this.currentSubject.next(list[0])
        }
      }
    })
  }

  all(): Observable<T []> {
    return from(this.entitySet.query())
  }

  create(body: T): Observable<T> {
    return from(this.entitySet.create(body))
  }
}
