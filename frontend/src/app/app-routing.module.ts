import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/project/project-list.module').then(m => m.ProjectListModule) },
  { path: 'projects', loadChildren: () => import('./pages/project/project-list.module').then(m => m.ProjectListModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
