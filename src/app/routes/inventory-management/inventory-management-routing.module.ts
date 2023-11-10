import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventoryManagementComponent } from './inventory-management.component';


const routes: Routes = [
  {
    path: '',
    component: InventoryManagementComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryManagementRoutingModule { }
