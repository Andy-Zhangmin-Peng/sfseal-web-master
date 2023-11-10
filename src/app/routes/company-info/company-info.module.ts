import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyInfoRoutingModule } from './company-info-routing.module';
import { CompanyInfoComponent } from './company-info.component';
import { PageHeaderModule } from '@delon/abc';
import { NzGridModule, NzCardModule, NzTableModule, NzFormModule } from 'ng-zorro-antd';
import { CompanyInfoService } from './company-info.service';
import { CompanyHttpService } from '@core/services/http/company-http';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@shared';


@NgModule({
  declarations: [CompanyInfoComponent],
  imports: [
    CommonModule,
    CompanyInfoRoutingModule,
    PageHeaderModule,
    NzCardModule,
    NzGridModule,
    FormsModule,
    NzFormModule,
    SharedModule,
    TranslateModule
  ],  
  providers: [
    CompanyInfoService,
    {
      provide: 'CompanyHttpServiceInterface',
      useClass: CompanyHttpService,
    },
  ],
})
export class CompanyInfoModule { }
