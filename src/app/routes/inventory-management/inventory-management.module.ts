import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryManagementRoutingModule } from './inventory-management-routing.module';
import { InventoryManagementComponent } from './inventory-management.component';
import { CompanyHttpService } from '@core/services/http/company-http';
import { InventoryManagementService } from './inventory-management.service';
import { PageHeaderModule } from '@delon/abc';
import { NzTableModule, NzCardModule, NzGridModule, NzDropDownModule, NzPopconfirmModule, NzIconModule, NzInputModule, NzButtonModule, NzModalModule, NzFormModule, NzSelectModule, NzMessageModule, NzDrawerModule, NzCheckboxModule, NzAlertModule, NzRadioModule, NzUploadModule, NzListModule, NzStatisticModule, NzInputNumberModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LockHttpService } from '@core/services/http/lock-http';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [InventoryManagementComponent],
  imports: [
    CommonModule,
    InventoryManagementRoutingModule,
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
    NzStatisticModule,
    NzInputNumberModule,
    TranslateModule
  ],
  providers: [
    InventoryManagementService,
    {
      provide: 'CompanyHttpServiceInterface',
      useClass: CompanyHttpService,
    },
    {
      provide: 'LockHttpServiceInterface',
      useClass: LockHttpService,
    },
  ],
})
export class InventoryManagementModule { }
