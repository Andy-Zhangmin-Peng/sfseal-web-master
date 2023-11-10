/*
 * Copyright 2020 Wanyun Corporation. All Rights Reserved.
 */

import { BaseModel } from '../base.model';

export class StaffModel extends BaseModel {
  accountId: number;
  name: string;
  mobile: string;
  officePhoneNumber: string;
  address: string;
  isActive: boolean;
  companyName: string;

  constructor(staff?) {
    super(staff);

    staff = staff || {};
    this.accountId = staff.accountId;
    this.name = staff.name;
    this.mobile = staff.mobile;
    this.officePhoneNumber = staff.officePhoneNumber;
    this.address = staff.address;
    this.isActive = staff.isActive;
    this.companyName = staff.companyName;
  }
}
