import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetItemListComponent } from './budget-item-list/budget-item-list.component';
import { BudgetItemFormComponent } from './budget-item-form/budget-item-form.component';
import { BudgetItemDetailsComponent } from './budget-item-details/budget-item-details.component';

const routes: Routes = [
  { path: ':id', component: BudgetItemListComponent },
  { path: ':id/create', component: BudgetItemFormComponent },
  { path: ':id/edit/:id1', component: BudgetItemFormComponent },
  { path: ':id/details/:id1', component: BudgetItemDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BudgetItemRoutingModule { }
