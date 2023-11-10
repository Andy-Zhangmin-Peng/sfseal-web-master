import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImportRecordManagementComponent } from './import-record-management.component';


const routes: Routes = [
  {
    path:'',
    component: ImportRecordManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportRecordManagementRoutingModule { }
