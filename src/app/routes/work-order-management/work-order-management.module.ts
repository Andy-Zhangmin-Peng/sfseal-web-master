import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkOrderManagementRoutingModule } from './work-order-management-routing.module';
import { WorkOrderManagementComponent } from './work-order-management.component';
import { WorkOrderManagementService } from './work-order-management.service';
import { WorkOrderHttpService } from '@core/services/http/work-order-http';
import { PageHeaderModule } from '@delon/abc';
import { NzTableModule, NzCardModule, NzGridModule, NzDropDownModule, NzInputModule, NzPopconfirmModule, NzIconModule, NzButtonModule, NzModalModule, NzFormModule, NzSelectModule, NzMessageModule, NzDrawerModule, NzCheckboxModule, NzAlertModule, NzRadioModule, NzUploadModule, NzTagModule, NzTreeSelectModule, NzDatePickerModule, NzToolTipModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AddressPipePipe } from './address-pipe.pipe';
import { WorkOrderDrawComponent } from './work-order-draw/work-order-draw.component';
import { WorkOrderDetailComponent } from './work-order-detail/work-order-detail.component';
import { BrowserModule } from '@angular/platform-browser';
import { BaiduMapModule } from 'angular2-baidu-map';
import { LockHttpService } from '@core/services/http/lock-http';
import { ReferenceHttpService } from '@core/services/http/reference-http.service';
import { BmapComponent } from './bmap/bmap.component';

@NgModule({
  declarations: [WorkOrderManagementComponent, AddressPipePipe, WorkOrderDrawComponent, WorkOrderDetailComponent, BmapComponent],
  imports: [
    CommonModule,
    WorkOrderManagementRoutingModule,
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
    TranslateModule,
    NzTreeSelectModule,
    NzToolTipModule,
    NzTagModule ,
    NzDatePickerModule ,
    BaiduMapModule.forRoot({ ak: '8YLHnkTizZqm7ChWM6NQjw7Ui40PXy8z' })
  ],
  providers: [
    WorkOrderManagementService,
    {
      provide: 'WorkOrderHttpServiceInterface',
      useClass: WorkOrderHttpService,
    },
    {
      provide: 'LockHttpServiceInterface',
      useClass: LockHttpService,
    },
    {
      provide: 'ReferenceHttpServiceInterface',
      useClass: ReferenceHttpService,
    },
  ],
})
export class WorkOrderManagementModule { }
