import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DonationListComponent } from './donation-list/donation-list.component';
import { DonationFormComponent } from './donation-form/donation-form.component';
import { DonationDetailsComponent } from './donation-details/donation-details.component';

const routes: Routes = [
  { path: ':id/:id1', component: DonationListComponent },
  { path: ':id/:id1/create', component: DonationFormComponent },
  { path: ':id/:id1/edit/:id2', component: DonationFormComponent },
  { path: ':id/:id1/details/:id2', component: DonationDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DonationRoutingModule { }
