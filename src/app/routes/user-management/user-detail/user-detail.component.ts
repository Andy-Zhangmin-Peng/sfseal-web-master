import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AccountModel } from 'src/app/common/model/user/account.model';
import { PageModeEnum } from 'src/app/common/enum/page-mode.enum';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserManagementService } from '../user-management.service';
import { ClipboardService } from 'ngx-clipboard';
import { NzMessageService } from 'ng-zorro-antd';
import { SettingsService } from '@delon/theme';
import * as _ from 'lodash';
import { duplicateValueValidator } from 'src/app/common/form-validator/duplicate-value.validator';
import { generate } from 'generate-password-browser';
import { UserModel } from 'src/app/common/model/user/user.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styles: []
})
export class UserDetailComponent implements OnInit {

  @Input() accountModel: AccountModel;
  @Input() pageMode: PageModeEnum;
  pageModeEnum = PageModeEnum;
  @Output() readonly visibleChange = new EventEmitter();

  userForm: FormGroup;
  title = '';
  showPassword = false;
  systemGeneratedPassword: string;
  constructor(
    private readonly _formBuilder: FormBuilder,
    private userManagementService: UserManagementService,
    private _clipboardService: ClipboardService,
    private message: NzMessageService,
    private settingsService: SettingsService,
  ) { }

  ngOnInit() {
    this.userForm = this.createUserForm();
  }

  createUserForm(): FormGroup {
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
      name: [_.get(_.get(this.accountModel, 'user'), 'name'), Validators.required],
      mobile: [_.get(_.get(this.accountModel, 'user'), 'mobile'),
      [Validators.pattern(/^[0-9-()（）+]+$/)],],
      address: [_.get(_.get(this.accountModel, 'user'), 'address')],
    });
    return formGroup;
  }

  save(): void {
    const data = this.userForm.getRawValue();
    const account = new AccountModel();
    const user = new UserModel();

    account.username = data.accountName;
    account.password = data.password;
    account.email = data.email;
    account.phoneNumber = data.phoneNumber;

    user.name = data.name;
    user.mobile = data.mobile;
    user.address = data.address;

    if (this.pageMode === this.pageModeEnum.EDIT) {
      account.createDate = this.accountModel.createDate;
      account.accountId = this.accountModel.accountId;
      user.createDate = this.accountModel.user.createDate;
      user.userId = this.accountModel.user.userId; 
    }

    account.user = user;

    setTimeout(() => {
      if (this.pageMode === this.pageModeEnum.EDIT) {
        this.userManagementService.updateFullUser(account).subscribe(
          result => {
            this.visibleChange.emit(false);
            this.message.info('终端用户更新成功！');
          },
          () => {
            this.message.error('终端用户更新失败！');
          },
        );
      } else {
        this.userManagementService.createUser(account).subscribe(
          result => {
            this.visibleChange.emit(false);
            this.message.info('终端用户创建成功！');
          },
          () => {
            this.message.error('终端用户创建失败！');
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
    this.userForm.get('password').setValue(this.systemGeneratedPassword);
    this.showPassword = true;
  }

  /**
   * Copy password
   */
  copyPassword() {
    this._clipboardService.copyFromContent(this.userForm.getRawValue().password);
    this.message.info('密码复制成功！');
  }

  /**
   * 账户名重复校验
   */
  checkUsernameExistingFunc = (data: any) => this.userManagementService.checkExistingValue('username', data);
  /**
   * 邮箱重复校验
   */
  checkEmailExistingFunc = (data: any) => this.userManagementService.checkExistingValue('email', data);
  /**
   * 邮箱重复校验
   */
  checkPhoneNumberExistingFunc = (data: any) => this.userManagementService.checkExistingValue('phoneNumber', data);
}
