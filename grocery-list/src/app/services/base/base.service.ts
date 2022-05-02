
import { OData, ODataQueryParam, param, PlainODataResponse, RawString } from "@odata/client"
import { EntitySet } from "@odata/client/lib/entityset";
import { EdmV4, ODataV4 } from "@odata/client/lib/types_v4";
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
  expandables!: string;


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

  byKey(key: string) {
    return from(this.entitySet.retrieve(this.getRaw(key)))
  }

  all(): Observable<T []> {    
    if(this.expandables){
      const filter = this.client.newParam().expand(this.expandables)
      return from(this.entitySet.query(filter))
    }
    return from(this.entitySet.query())
  }

  create(body: T): Observable<T> {
    return from(this.entitySet.create(body))
  }

  update(key: string, body: T): Observable<void> {
    return from(this.entitySet.update(this.getRaw(key), body))
  }

  private getRaw(key: string): RawString {
    const concat = `(${key})`
    return EdmV4.RawString.from(concat)
  }
}
