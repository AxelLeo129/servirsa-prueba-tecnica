import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectFormRoutingModule } from './project-form-routing.module';
import { ProjectFormComponent } from './project-form.component';


@NgModule({
  declarations: [
    ProjectFormComponent
  ],
  imports: [
    CommonModule,
    ProjectFormRoutingModule
  ]
})
export class ProjectFormModule { }
