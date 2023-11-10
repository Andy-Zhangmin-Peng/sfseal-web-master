import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExceptionalSituationManagementRoutingModule } from './exceptional-situation-management-routing.module';
import { ExceptionalSituationManagementComponent } from './exceptional-situation-management.component';
import { PageHeaderModule } from '@delon/abc';
import { NzTableModule, NzCardModule, NzGridModule, NzDropDownModule, NzInputModule, NzPopconfirmModule, NzIconModule, NzButtonModule, NzModalModule, NzFormModule, NzSelectModule, NzMessageModule, NzDrawerModule, NzCheckboxModule, NzAlertModule, NzRadioModule, NzUploadModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ExceptionalSituationManagementService } from './exceptional-situation-management.service';
import { ExceptionalSituationHttpService } from '@core/services/http/exceptional-situation-http.service';
import { ExceptionalSituationDrawComponent } from './exceptional-situation-draw/exceptional-situation-draw.component';
import { ExceptionalSituationDetailComponent } from './exceptional-situation-detail/exceptional-situation-detail.component';


@NgModule({
  declarations: [ExceptionalSituationManagementComponent, ExceptionalSituationDrawComponent, ExceptionalSituationDetailComponent],
  imports: [
    CommonModule,
    ExceptionalSituationManagementRoutingModule,
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
    NzAlertModule,
    NzUploadModule ,
    TranslateModule
  ],
  providers: [
    ExceptionalSituationManagementService,
    {
      provide: 'ExceptionalSituationHttpServiceInterface',
      useClass: ExceptionalSituationHttpService,
    },
  ],
})
export class ExceptionalSituationManagementModule { }
