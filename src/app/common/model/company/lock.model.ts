/*
 * Copyright 2020 Wanyun Corporation. All Rights Reserved.
 */

import { BaseModel } from '../base.model';

export class LockModel extends BaseModel {
    companyId: number;
    rfid: string;
    boxId: string;
    barCode: string;
    statusCode: number;
    companyName: string;
    statusName: string;

  constructor(lock?) {
    super(lock);

    lock = lock || {};
    this.companyId = lock.companyId;
    this.rfid = lock.rfid;
    this.boxId = lock.boxId;
    this.barCode = lock.barCode;
    this.statusCode = lock.statusCode;
    this.companyName = lock.companyName;
    this.statusName = lock.statusName;
  }
}
