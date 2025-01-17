import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/project/project-list.module').then(m => m.ProjectListModule) },
  { path: 'projects', loadChildren: () => import('./pages/project/project-list.module').then(m => m.ProjectListModule) },
  { path: 'budget-items', loadChildren: () => import('./pages/budget-item/budget-item.module').then(m => m.BudgetItemsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
