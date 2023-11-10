import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserManagementComponent } from './user-management.component';
import { StaffManagementService } from '../staff-management/staff-management.service';
import { StaffHttpService } from '@core/services/http/staff-http.service';
import { UserManagementService } from './user-management.service';
import { UserHttpService } from '@core/services/http/user-http.service';
import { PageHeaderModule } from '@delon/abc';
import { NzGridModule, NzCardModule, NzTableModule, NzDropDownModule, NzInputModule, NzPopconfirmModule, NzIconModule, NzButtonModule, NzModalModule, NzFormModule, NzSelectModule, NzMessageModule, NzDrawerModule, NzCheckboxModule, NzAlertModule, NzRadioModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { UserDrawComponent } from './user-draw/user-draw.component';
import { UserDetailComponent } from './user-detail/user-detail.component';


@NgModule({
  declarations: [UserManagementComponent, UserDrawComponent, UserDetailComponent],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    PageHeaderModule,
    NzGridModule,
    NzCardModule,
    NzTableModule,
    NzDropDownModule,
    NzInputModule,
    FormsModule,
    NzPopconfirmModule,
    NzIconModule,
    NzButtonModule,
    NzModalModule,
    NzFormModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzMessageModule,
    NzDrawerModule,
    NzCheckboxModule,
    NzAlertModule,
    NzRadioModule,
    TranslateModule
  ],
  providers: [
    UserManagementService,
    {
      provide: 'UserHttpServiceInterface',
      useClass: UserHttpService,
    },
    {
      provide: 'StaffHttpServiceInterface',
      useClass: StaffHttpService,
    },
  ],
})
export class UserManagementModule { }
