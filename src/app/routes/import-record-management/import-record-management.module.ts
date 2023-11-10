import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImportRecordManagementRoutingModule } from './import-record-management-routing.module';
import { ImportRecordManagementComponent } from './import-record-management.component';
import { PageHeaderModule } from '@delon/abc';
import { NzTableModule, NzCardModule, NzGridModule, NzDropDownModule, NzInputModule, NzPopconfirmModule, NzIconModule, NzButtonModule, NzModalModule, NzFormModule, NzSelectModule, NzMessageModule, NzDrawerModule, NzCheckboxModule, NzAlertModule, NzListModule, NzTreeSelectModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LockHttpService } from '@core/services/http/lock-http';
import { ImportRecordManagementService } from './import-record-management.service';
import { ImportRecordDrawComponent } from './import-record-draw/import-record-draw.component';
import { ImportRecordDetailComponent } from './import-record-detail/import-record-detail.component';

@NgModule({
  declarations: [ImportRecordManagementComponent, ImportRecordDrawComponent, ImportRecordDetailComponent],
  imports: [
    CommonModule,
    ImportRecordManagementRoutingModule,
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
    NzTreeSelectModule,
    TranslateModule
  ],
  providers: [
    ImportRecordManagementService,
    {
      provide: 'LockHttpServiceInterface',
      useClass: LockHttpService,
    }
  ],
})
export class ImportRecordManagementModule { }
