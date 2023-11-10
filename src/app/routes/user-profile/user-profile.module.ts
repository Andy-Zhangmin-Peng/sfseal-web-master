import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './user-profile.component';
import { NzGridModule, NzCardModule, NzTableModule, NzDropDownModule, NzInputModule, NzPopconfirmModule, NzIconModule, NzButtonModule, NzModalModule, NzFormModule, NzSelectModule, NzMessageModule, NzDrawerModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { UserProfileService } from './user-profile.service';
import { StaffHttpService } from '@core/services/http/staff-http.service';
import { PageHeaderModule } from '@delon/abc';


@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
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
    TranslateModule
  ],
  providers: [
    UserProfileService,
    {
      provide: 'StaffHttpServiceInterface',
      useClass: StaffHttpService,
    }
  ],
})
export class UserProfileModule { }
