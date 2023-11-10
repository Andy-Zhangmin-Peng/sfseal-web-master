import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExceptionalSituationManagementComponent } from './exceptional-situation-management.component';


const routes: Routes = [
  {
    path:'',
    component:ExceptionalSituationManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExceptionalSituationManagementRoutingModule { }
