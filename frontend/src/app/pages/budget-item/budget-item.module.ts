import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxLoadingModule } from 'ngx-loading';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { BudgetItemListComponent } from './budget-item-list/budget-item-list.component';
import { BudgetItemFormComponent } from './budget-item-form/budget-item-form.component';
import { BudgetItemDetailsComponent } from './budget-item-details/budget-item-details.component';
import { BudgetItemRoutingModule } from './budget-item-routing.module';

@NgModule({
  declarations: [
    BudgetItemListComponent,
    BudgetItemFormComponent,
    BudgetItemDetailsComponent
  ],
  imports: [
    CommonModule,
    BudgetItemRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    NgxLoadingModule.forRoot({}),
    MatSelectModule,
    MatOptionModule
  ]
})
export class BudgetItemsModule { }
