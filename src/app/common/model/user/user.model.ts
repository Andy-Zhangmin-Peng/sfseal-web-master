/*
 * Copyright 2020 Wanyun Corporation. All Rights Reserved.
 */

import { BaseModel } from '../base.model';

export class UserModel extends BaseModel {
  userId: number;
  name: string;
  accountId: number;
  address: string;
  mobile: string;
  
  constructor(user?) {
    super(user);
    user = user || {};
    this.userId = user.userId;
    this.name = user.name;
    this.accountId = user.accountId;
    this.address = user.address;
    this.mobile = user.mobile;
  }
}
