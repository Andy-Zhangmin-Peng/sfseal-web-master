import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, ValidationErrors, FormControl, Validators, FormBuilder } from '@angular/forms';
import * as _ from 'lodash';
import { PageModeEnum } from 'src/app/common/enum/page-mode.enum';
import { generate } from 'generate-password-browser';
import { ClipboardService } from 'ngx-clipboard';
import { NzMessageService } from 'ng-zorro-antd';
import { StaffManagementService } from '../staff-management.service';
import { Observable, Observer } from 'rxjs';
import { AccountModel } from 'src/app/common/model/user/account.model';
import { duplicateValueValidator } from 'src/app/common/form-validator/duplicate-value.validator';
import { StaffModel } from 'src/app/common/model/staff/staff.model';
import { RoleModel } from 'src/app/common/model/user/role.model';
import { CompanyModel } from 'src/app/common/model/company/company.model';
import { RoleConstant } from 'src/app/common/constant/role.constant';
import { SettingsService } from '@delon/theme';


@Component({
  selector: 'app-staff-detail',
  templateUrl: './staff-detail.component.html',
  styles: [],
})
export class StaffDetailComponent implements OnInit, OnChanges {
  @Input() accountModel: AccountModel;
  @Input() pageMode: PageModeEnum;
  @Input() roleList = [];
  @Input() companyList = [];
  pageModeEnum = PageModeEnum;

  @Output() readonly visibleChange = new EventEmitter();

  staffForm: FormGroup;
  title = '';
  
  showCompany: boolean;
  roleValue: string;

  showPassword = false;
  systemGeneratedPassword: string;

  isSystemadmin = false;

  orginFiltercompany = [];
  selectedOne = [];

  constructor(
    private readonly _formBuilder: FormBuilder,
    private staffManagementService: StaffManagementService,
    private _clipboardService: ClipboardService,
    private message: NzMessageService,
    private settingsService: SettingsService,
  ) {}

  ngOnInit() {
    console.log(this.settingsService.user.company);
    if (this.settingsService.user.roles[0].roleId === 1){
      this.isSystemadmin = true;
    }else {
      this.companyList = [];
      this.companyList.push({
        text: this.settingsService.user.company.companyName,
        value: this.settingsService.user.company.companyId,
      });
      
    }

    this.staffForm = this.createSaffForm();
  }
  ngOnChanges(changes: SimpleChanges): void {}

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
    const data = this.staffForm.getRawValue();
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

    if (this.pageMode === this.pageModeEnum.EDIT) {
      account.createDate = this.accountModel.createDate;
      account.accountId = this.accountModel.accountId;
      staff.createDate = this.accountModel.staff.createDate;
    }

    account.company = company;
    account.roles = roles;
    account.staff = staff;

    setTimeout(() => {
      if (this.pageMode === this.pageModeEnum.EDIT) {
        this.staffManagementService.updateFullStaff(account).subscribe(
          result => {
            this.visibleChange.emit(false);
            this.message.info('用户更新成功！');
          },
          () => {
            this.message.error('用户更新失败！');
          },
        );
      } else {
        this.staffManagementService.createStaff(account).subscribe(
          result => {
            this.visibleChange.emit(false);
            this.message.info('用户创建成功！');
          },
          () => {
            this.message.error('用户创建失败！');
          },
        );
      }
    }, 1000);
  }

  // 取消Sidebar
  close() {
    this.visibleChange.emit(false);
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
    this.staffForm.get('password').setValue(this.systemGeneratedPassword);
    this.showPassword = true;
  }

  /**
   * Copy password
   */
  copyPassword() {
    this._clipboardService.copyFromContent(this.staffForm.getRawValue().password);
    this.message.info('密码复制成功！');
  }

  /**
   * 账户名重复校验
   */
  checkUsernameExistingFunc = (data: any) => this.staffManagementService.checkExistingValue('username', data);
  /**
   * 邮箱重复校验
   */
  checkEmailExistingFunc = (data: any) => this.staffManagementService.checkExistingValue('email', data);
  /**
   * 邮箱重复校验
   */
  checkPhoneNumberExistingFunc = (data: any) => this.staffManagementService.checkExistingValue('phoneNumber', data);
}
