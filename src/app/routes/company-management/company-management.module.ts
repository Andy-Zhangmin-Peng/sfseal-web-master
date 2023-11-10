import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyManagementRoutingModule } from './company-management-routing.module';
import { CompanyManagementService } from './company-management.service';
import { CompanyHttpService } from '@core/services/http/company-http';
import { CompanyManagementComponent } from './company-management.component';
import { PageHeaderModule } from '@delon/abc';
import { NzGridModule, NzTableModule, NzCardModule, NzDropDownModule, NzInputModule, NzIconModule, NzPopconfirmModule, NzButtonModule, NzModalModule, NzFormModule, NzSelectModule, NzMessageModule, NzDrawerModule, NzCheckboxModule, NzAlertModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompanyDrawComponent } from './company-draw/company-draw.component';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { TranslateModule } from '@ngx-translate/core';

const COMPONENTS = [CompanyManagementComponent];

@NgModule({
  declarations: [...COMPONENTS, CompanyDrawComponent, CompanyDetailComponent],
  imports: [
    CommonModule,
    CompanyManagementRoutingModule,
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
    TranslateModule
  ],  
  providers: [
    CompanyManagementService,
    {
      provide: 'CompanyHttpServiceInterface',
      useClass: CompanyHttpService,
    },
  ],
})
export class CompanyManagementModule { }
