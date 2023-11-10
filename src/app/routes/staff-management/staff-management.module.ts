import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffManagementRoutingModule } from './staff-management-routing.module';
import { StaffManagementComponent } from './staff-management.component';
import { StaffDetailComponent } from './staff-detail/staff-detail.component';
import { PageHeaderModule } from '@delon/abc';
import {
  NzCardModule,
  NzGridModule,
  NzTableModule,
  NzDropDownModule,
  NzInputModule,
  NzPopconfirmModule,
  NzIconModule,
  NzButtonModule,
  NzModalModule,
  NzFormModule,
  NzSelectModule,
  NzMessageModule,
  NzDrawerModule,
  NzCheckboxModule,
  NzAlertModule,
  NzRadioModule,
} from 'ng-zorro-antd';
import { StaffManagementService } from './staff-management.service';
import { StaffHttpService } from '@core/services/http/staff-http.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserHttpService } from '@core/services/http/user-http.service';
import { StaffDrawComponent } from './staff-draw/staff-draw.component';
import { CompanyHttpService } from '@core/services/http/company-http';
import { TranslateModule } from '@ngx-translate/core';

const COMPONENTS = [StaffManagementComponent];

@NgModule({
  declarations: [...COMPONENTS, StaffDetailComponent, StaffDrawComponent],
  imports: [
    CommonModule,
    PageHeaderModule,
    StaffManagementRoutingModule,
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
    StaffManagementService,
    {
      provide: 'StaffHttpServiceInterface',
      useClass: StaffHttpService,
    },
    {
      provide: 'CompanyHttpServiceInterface',
      useClass: CompanyHttpService,
    },
    {
      provide: 'UserHttpServiceInterface',
      useClass: UserHttpService,
    },
  ],
})
export class StaffManagementModule {}
