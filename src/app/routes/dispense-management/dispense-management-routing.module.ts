import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DispenseManagementComponent } from './dispense-management.component';


const routes: Routes = [{
  path: '',
  component: DispenseManagementComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DispenseManagementRoutingModule { }
