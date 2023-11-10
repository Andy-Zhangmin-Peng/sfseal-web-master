/*
 * Copyright 2020 Wanyun Corporation. All Rights Reserved.
 */

import { BaseModel } from '../base.model';
import { RoleModel } from './role.model';
import { UserModel } from './user.model';
import { StaffModel } from '../staff/staff.model';
import { CompanyModel } from '../company/company.model';

export class AccountModel extends BaseModel {
  accountId: number;
  username: string;
  password: string;
  phoneNumber: string;
  email: string;
  roles: Array<RoleModel>;
  company: CompanyModel;
  user: UserModel;
  staff: StaffModel;

  constructor(account?) {
    super(account);

    account = account || {};
    this.accountId = account.accountId;
    this.username = account.username;
    this.password = account.password;
    this.phoneNumber = account.phoneNumber;
    this.email = account.email;
    this.roles = account.roles;
    this.company = account.company;
    this.user = account.user;
    this.staff = account.staff;
  }
}
