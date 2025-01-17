import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/project/project-list/project-list.module').then(m => m.ProjectListModule) },
  { path: 'projects', loadChildren: () => import('./pages/project/project-list/project-list.module').then(m => m.ProjectListModule) },
  { path: 'project', loadChildren: () => import('./pages/project/project-form/project-form.module').then(m => m.ProjectFormModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
