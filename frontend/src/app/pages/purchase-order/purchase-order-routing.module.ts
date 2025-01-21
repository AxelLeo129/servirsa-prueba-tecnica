import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseOrderListComponent } from './purchase-order-list/purchase-order-list.component';
import { PurchaseOrderFormComponent } from './purchase-order-form/purchase-order-form.component';
import { PurchaseOrderDetailsComponent } from './purchase-order-details/purchase-order-details.component';

const routes: Routes = [
  { path: ':id/:id1', component: PurchaseOrderListComponent },
  { path: ':id/:id1/create', component: PurchaseOrderFormComponent },
  { path: ':id/:id1/edit/:id2', component: PurchaseOrderFormComponent },
  { path: ':id/:id1/details/:id2', component: PurchaseOrderDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseOrderRoutingModule { }
