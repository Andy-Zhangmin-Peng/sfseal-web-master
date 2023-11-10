import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { AccountModel } from 'src/app/common/model/user/account.model';
import { PageModeEnum } from 'src/app/common/enum/page-mode.enum';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SettingsService } from '@delon/theme';
import { duplicateValueValidator } from 'src/app/common/form-validator/duplicate-value.validator';
import { StaffModel } from 'src/app/common/model/staff/staff.model';
import { RoleModel } from 'src/app/common/model/user/role.model';
import { CompanyModel } from 'src/app/common/model/company/company.model';
import { RoleConstant } from 'src/app/common/constant/role.constant';
import { generate } from 'generate-password-browser';
import { NzMessageService } from 'ng-zorro-antd';
import * as _ from 'lodash';
import { ClipboardService } from 'ngx-clipboard';
import { UserProfileService } from './user-profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styles: []
})
export class UserProfileComponent implements OnInit {
  accountModel: any;
  userProfileForm: FormGroup;
  showPassword = false;
  systemGeneratedPassword: string;

  constructor(
    private settings: SettingsService,
    private readonly _formBuilder: FormBuilder,
    private message: NzMessageService,
    private _clipboardService: ClipboardService,
    private userProfileService: UserProfileService
  ) {}

  ngOnInit() {
    this.accountModel = this.settings.user;
    this.userProfileForm = this.createSaffForm();
  }

  createSaffForm(): FormGroup {
    const formGroup = this._formBuilder.group({
      accountName: [
        _.get(this.accountModel, 'username'),
        [Validators.required],
        [duplicateValueValidator(this.checkUsernameExistingFunc, _.get(this.accountModel, 'username'))],
      ],
      password: [_.get(this.accountModel, 'password'), Validators.required],
      email: [
        _.get(this.accountModel, 'email'),
        [Validators.email],
        [duplicateValueValidator(this.checkEmailExistingFunc, _.get(this.accountModel, 'email'))],
      ],
      phoneNumber: [_.get(this.accountModel, 'phoneNumber'),
      [Validators.pattern(/^[0-9-()（）+]+$/)],
      [ duplicateValueValidator(this.checkPhoneNumberExistingFunc, _.get(this.accountModel, 'phoneNumber'))],
      ],
      companyId: [_.get(_.get(_.get(this.accountModel, 'staff'), 'company'), 'companyId')],
      name: [_.get(_.get(this.accountModel, 'staff'), 'name'), Validators.required],
      mobile: [_.get(_.get(this.accountModel, 'staff'), 'mobile'),
      [Validators.pattern(/^[0-9-()（）+]+$/)],],
      officePhoneNumber: [_.get(_.get(this.accountModel, 'staff'), 'officePhoneNumber'),[Validators.pattern(/^[0-9-()（）+]+$/)]],
      address: [_.get(_.get(this.accountModel, 'staff'), 'address')],
    });
    return formGroup;
  }

  save(): void {
    const data = this.userProfileForm.getRawValue();
    const account = new AccountModel();
    const staff = new StaffModel();
    const role = new RoleModel();
    const roles = Array<RoleModel>();
    const company = new CompanyModel();

    account.username = data.accountName;
    account.password = data.password;
    account.email = data.email;
    account.phoneNumber = data.phoneNumber;

    if (data.companyId === undefined || data.companyId === null){
      company.companyId = 1;
      role.roleId = RoleConstant.SYSTEM_ADMIN;
    } else{
      company.companyId = data.companyId;
      role.roleId = RoleConstant.COMPANY_ADMIN;
    }
    
    roles.push(role);

    staff.name = data.name;
    staff.mobile = data.mobile;
    staff.officePhoneNumber = data.officePhoneNumber;
    staff.address = data.address;

    account.createDate = this.accountModel.createDate;
    account.accountId = this.accountModel.accountId;
    staff.createDate = this.accountModel.staff.createDate;
   

    account.company = company;
    account.roles = roles;
    account.staff = staff;

    setTimeout(() => {
      this.userProfileService.updateFullStaff(account).subscribe( result => {
          this.message.info('用户更新成功！');
        },
        () => {
          this.message.error('用户更新失败！');
        },
      );
    }, 1000);
  }

  /**
   * generate password
   */
  generatePassword() {
    this.systemGeneratedPassword = generate({
      length: 12,
      numbers: true,
      uppercase: true,
    });
    this.userProfileForm.get('password').setValue(this.systemGeneratedPassword);
    this.showPassword = true;
  }

  /**
   * Copy password
   */
  copyPassword() {
    this._clipboardService.copyFromContent(this.systemGeneratedPassword);
    this.message.info('密码复制成功！');
  }

  /**
   * 账户名重复校验
   */
  checkUsernameExistingFunc = (data: any) => this.userProfileService.checkExistingValue('username', data);
  /**
   * 邮箱重复校验
   */
  checkEmailExistingFunc = (data: any) => this.userProfileService.checkExistingValue('email', data);
  /**
   * 邮箱重复校验
   */
  checkPhoneNumberExistingFunc = (data: any) => this.userProfileService.checkExistingValue('phoneNumber', data);

}
