import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemComponent } from './components/item/item.component';
import { ListComponent } from './components/list/list.component';
import { FocusOutDirective } from './directives/focus-out.directive';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ListStarterComponent } from './components/list-starter/list-starter.component';



@NgModule({
  declarations: [
    ItemComponent,
    ListComponent,
    FocusOutDirective,
    ListStarterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule
  ],
  exports: [
    ItemComponent,
    ListComponent,
    ListStarterComponent
  ]
})
export class CoreModule { }
