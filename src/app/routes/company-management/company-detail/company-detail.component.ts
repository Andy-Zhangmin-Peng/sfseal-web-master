import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CompanyModel } from 'src/app/common/model/company/company.model';
import { PageModeEnum } from 'src/app/common/enum/page-mode.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClipboardService } from 'ngx-clipboard';
import { CompanyManagementService } from '../company-management.service';
import { NzMessageService } from 'ng-zorro-antd';
import * as _ from 'lodash';
import { duplicateValueValidator } from 'src/app/common/form-validator/duplicate-value.validator';
@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styles: []
})
export class CompanyDetailComponent implements OnInit {
  @Input() companyModel: CompanyModel;
  @Input() pageMode: PageModeEnum;
  
  pageModeEnum = PageModeEnum;

  companyForm : FormGroup;

  @Output() readonly visibleChange = new EventEmitter();
  constructor(
    private readonly _formBuilder: FormBuilder,
    private companyManagementService: CompanyManagementService,
    private message: NzMessageService,
  ) { }

  ngOnInit() {
    this.companyForm = this.createSaffForm();
  }
  createSaffForm(): FormGroup {
    const formGroup = this._formBuilder.group({
      companyName: [_.get(this.companyModel, 'companyName'), Validators.required, [duplicateValueValidator(this.checkCompanynameExistingFunc, _.get(this.companyModel, 'companyName'))],],
      email: [_.get(this.companyModel, 'email'), [Validators.required, Validators.email], [duplicateValueValidator(this.checkEmailExistingFunc, _.get(this.companyModel, 'email'))],],
      phoneNumber: [_.get(this.companyModel, 'phoneNumber'), [Validators.required,Validators.pattern(/^[0-9-()（）+]+$/)] , [duplicateValueValidator(this.checkPhoneNumberExistingFunc, _.get(this.companyModel, 'phoneNumber'))],],
      address: [_.get(this.companyModel, 'address'), Validators.required],
    });
    return formGroup;
  }
   // 取消Sidebar
   close() {
    this.visibleChange.emit(false);
  }

  save(): void {
    const data = this.companyForm.getRawValue();
    const company = new CompanyModel();
    company.companyName = data.companyName;
    company.phoneNumber = data.phoneNumber;
    company.email = data.email;
    company.address = data.address;

    if (this.pageMode === this.pageModeEnum.EDIT) {
      company.createDate = this.companyModel.createDate;
      company.companyId = this.companyModel.companyId;
    }

    setTimeout(() => {
      if (this.pageMode === this.pageModeEnum.EDIT) {
        this.companyManagementService.updateCompany(company).subscribe(
          result => {
            this.visibleChange.emit(false);
            this.message.info('企业更新成功！');
          },
          () => {
            this.message.error('企业更新失败！');
          },
        );
      } else {
        this.companyManagementService.createCompany(company).subscribe(
          result => {
            this.visibleChange.emit(false);
            this.message.info('企业创建成功！');
          },
          () => {
            this.message.error('企业创建失败！');
          },
        );
      }
    }, 1000);
  }

  /**
   * 企业名重复校验
   */
  checkCompanynameExistingFunc = (data: any) => this.companyManagementService.checkExistingValue('companyName', data);
  /**
   * 邮箱重复校验
   */
  checkEmailExistingFunc = (data: any) => this.companyManagementService.checkExistingValue('email', data);
  /**
   * 企业电话重复校验
   */
  checkPhoneNumberExistingFunc = (data: any) => this.companyManagementService.checkExistingValue('phoneNumber', data);
}
