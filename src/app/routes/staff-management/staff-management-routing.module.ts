import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StaffManagementComponent } from './staff-management.component';
import { StaffDetailComponent } from './staff-detail/staff-detail.component';

const routes: Routes = [
  {
    path: '',
    component: StaffManagementComponent,
  },
  {
    path: 'detail',
    component: StaffDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffManagementRoutingModule {}
