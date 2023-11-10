import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkOrderManagementComponent } from './work-order-management.component';


const routes: Routes = [
  {
    path:'',
    component: WorkOrderManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkOrderManagementRoutingModule { }
