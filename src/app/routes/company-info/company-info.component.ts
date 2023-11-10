import { Component, OnInit } from '@angular/core';
import { CompanyModel } from 'src/app/common/model/company/company.model';
import { SettingsService } from '@delon/theme';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CompanyInfoService } from './company-info.service';
import * as _ from 'lodash';
import { NzMessageService } from 'ng-zorro-antd';
@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styles: []
})
export class CompanyInfoComponent implements OnInit {

  company: CompanyModel;
  companyForm: FormGroup;
  constructor(
    private settings: SettingsService,
    private readonly formBuilder: FormBuilder,
    private readonly companyInfo: CompanyInfoService,
    private message: NzMessageService,
  ) { }

  ngOnInit() {
    this.company = this.settings.user.staff.company;
    this.companyForm = this.createCompanyInforForm()
  }

  createCompanyInforForm(): FormGroup{
    return this.formBuilder.group({
      companyName: new FormControl(_.get(this.company, 'companyName'), [Validators.required]),
      phoneNumber: new FormControl(_.get(this.company, 'phoneNumber'), [Validators.required]),
      email: new FormControl(_.get(this.company, 'email'), [Validators.required]),
      address: new FormControl(_.get(this.company, 'address'), [Validators.required]),
    });
  }

  save(): void {
    const data = this.companyForm.getRawValue();
    const company = new CompanyModel();
    company.companyName = data.companyName;
    company.phoneNumber = data.phoneNumber;
    company.email = data.email;
    company.address = data.address;
    company.createDate = this.company.createDate;
    company.companyId = this.company.companyId;

    setTimeout(() => {
      this.companyInfo.updateCompany(company).subscribe(
        result => {
          this.message.info('企业更新成功！');
        },
        () => {
          this.message.error('企业更新失败！');
        },
      );
    }, 1000);
  }
}
