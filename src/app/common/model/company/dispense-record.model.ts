/*
 * Copyright 2020 Wanyun Corporation. All Rights Reserved.
 */

import { BaseModel } from '../base.model';

export class DispenseRecordModel extends BaseModel {
  dispenseRecordId: number;
  companyId: number;
  companyName: string;
  dispenseCount: number;
  isActive: boolean;
  accpeted: boolean;

  constructor(dispenseRecord?) {
    super(dispenseRecord);

    dispenseRecord = dispenseRecord || {};
    this.companyId = dispenseRecord.companyId;
    this.companyName = dispenseRecord.companyName;
    this.dispenseRecordId = dispenseRecord.dispenseRecordId;
    this.dispenseCount = dispenseRecord.dispenseCount;
    this.isActive =  dispenseRecord.isActive;
    this.accpeted = dispenseRecord.accpeted;
  }
}
