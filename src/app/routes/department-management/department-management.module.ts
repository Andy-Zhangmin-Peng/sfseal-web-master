import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentManagementRoutingModule } from './department-management-routing.module';
import { DepartmentManagementComponent } from './department-management.component';
import { PageHeaderModule } from '@delon/abc';
import { CompanyHttpService } from '@core/services/http/company-http';
import { DepartmentManagementService } from './department-management.service';
import { NzCardModule, NzTableModule, NzDropDownModule, NzGridModule, NzInputModule, NzPopconfirmModule, NzIconModule, NzModalModule, NzFormModule, NzButtonModule, NzSelectModule, NzMessageModule, NzDrawerModule, NzCheckboxModule, NzAlertModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DepartmentDrawComponent } from './department-draw/department-draw.component';
import { DepartmentDetailComponent } from './department-detail/department-detail.component';
import { TranslateModule } from '@ngx-translate/core';

const COMPONENTS = [DepartmentManagementComponent];
@NgModule({
  declarations: [...COMPONENTS, DepartmentDrawComponent, DepartmentDetailComponent,],
  imports: [
    CommonModule,
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
    DepartmentManagementRoutingModule,
    TranslateModule
  ],
  providers: [
    DepartmentManagementService,
    {
      provide: 'CompanyHttpServiceInterface',
      useClass: CompanyHttpService,
    },
  ],
})
export class DepartmentManagementModule { }
