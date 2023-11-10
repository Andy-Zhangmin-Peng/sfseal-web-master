import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LockManagementRoutingModule } from './lock-management-routing.module';
import { LockManagementComponent } from './lock-management.component';
import { PageHeaderModule } from '@delon/abc';
import { NzCardModule, NzGridModule, NzDropDownModule, NzInputModule, NzPopconfirmModule, NzIconModule, NzButtonModule, NzModalModule, NzFormModule, NzSelectModule, NzMessageModule, NzCheckboxModule, NzAlertModule, NzRadioModule, NzDrawerModule, NzTableModule, NzUploadModule } from 'ng-zorro-antd';
import { LockManagementService } from './lock-management.service';
import { LockHttpService } from '@core/services/http/lock-http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompanyHttpService } from '@core/services/http/company-http';
import { LockDrawComponent } from './lock-draw/lock-draw.component';
import { LockDetailComponent } from './lock-detail/lock-detail.component';
import { ReferenceHttpService } from '@core/services/http/reference-http.service';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [LockManagementComponent, LockDrawComponent, LockDetailComponent],
  imports: [
    CommonModule,
    LockManagementRoutingModule,
    PageHeaderModule,
    NzTableModule,
    NzCardModule,
    NzGridModule,
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
    NzUploadModule,
    TranslateModule
  ],
  providers: [
    LockManagementService,
    {
      provide: 'LockHttpServiceInterface',
      useClass: LockHttpService,
    },
    {
      provide: 'CompanyHttpServiceInterface',
      useClass: CompanyHttpService,
    },
    {
      provide: 'ReferenceHttpServiceInterface',
      useClass: ReferenceHttpService,
    },
  ],
})
export class LockManagementModule { }
