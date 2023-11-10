import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DispenseManagementRoutingModule } from './dispense-management-routing.module';
import { DispenseManagementComponent } from './dispense-management.component';
import { DispenseManagementService } from './dispense-management.service';
import { ReferenceHttpService } from '@core/services/http/reference-http.service';
import { PageHeaderModule } from '@delon/abc';
import { NzTableModule, NzCardModule, NzGridModule, NzDropDownModule, NzInputModule, NzPopconfirmModule, NzIconModule, NzButtonModule, NzModalModule, NzFormModule, NzSelectModule, NzMessageModule, NzDrawerModule, NzCheckboxModule, NzAlertModule, NzRadioModule, NzUploadModule, NzListModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LockHttpService } from '@core/services/http/lock-http';
import { DispenseDrawComponent } from './dispense-draw/dispense-draw.component';
import { DispenseDetailComponent } from './dispense-detail/dispense-detail.component';
import { LockManagementService } from '../lock-management/lock-management.service';
import { CompanyHttpService } from '@core/services/http/company-http';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [DispenseManagementComponent, DispenseDrawComponent, DispenseDetailComponent,],
  imports: [
    CommonModule,
    DispenseManagementRoutingModule,
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
    NzListModule,
    TranslateModule
  ],
  providers: [
    DispenseManagementService,
    {
      provide: 'ReferenceHttpServiceInterface',
      useClass: ReferenceHttpService,
    },
    {
      provide: 'ReferenceHttpServiceInterface',
      useClass: ReferenceHttpService,
    },
    {
      provide: 'LockHttpServiceInterface',
      useClass: LockHttpService,
    },
    {
      provide: 'CompanyHttpServiceInterface',
      useClass: CompanyHttpService,
    },
  ],
})
export class DispenseManagementModule { }
