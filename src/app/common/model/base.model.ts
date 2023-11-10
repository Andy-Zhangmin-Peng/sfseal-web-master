/*
 * Copyright 2020 Wanyun Corporation. All Rights Reserved.
 */

export class BaseModel {
  createDate: number;
  lastUpdateDate: number;
  lastUpdateUser: string;

  constructor(base?) {
    base = base || {};
    this.createDate = base.createDate;
    this.lastUpdateDate = base.lastUpdateDate;
    this.lastUpdateUser = base.lastUpdateUser;
  }
}
