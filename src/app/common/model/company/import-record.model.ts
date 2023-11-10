/*
 * Copyright 2020 Wanyun Corporation. All Rights Reserved.
 */

import { BaseModel } from '../base.model';

export class ImportRecordModel extends BaseModel {
  importId: number;
  importCount: number;

  constructor(importRecord?) {
    super(importRecord);

    importRecord = importRecord || {};
    this.importId = importRecord.importId;
    this.importCount = importRecord.importCount;
  }
}
