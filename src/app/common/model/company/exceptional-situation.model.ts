/*
 * Copyright 2020 Wanyun Corporation. All Rights Reserved.
 */

import { BaseModel } from '../base.model';
import { AttachmentModel } from './attachment.model';

export class ExceptionalSituationModel extends BaseModel {
  exceptionId: number;
  exceptionLevel: number;
  exceptionTypeCode: number;
  exceptionTypeName: string;
  exceptionMessage: string;
  reportAddressId: number;
  reportUserId: number;
  barCode: string;
  workOrderId: number;
  tranId: string;
  addressDetail: string;
  attachmentList: Array<AttachmentModel>;

  constructor(exception?) {
    super(exception);

    exception = exception || {};
    this.exceptionId = exception.exceptionId;
    this.exceptionLevel = exception.exceptionLevel;
    this.exceptionTypeCode = exception.exceptionTypeCode;
    this.exceptionTypeName = exception.exceptionTypeName;
    this.exceptionMessage = exception.exceptionMessage;
    this.reportAddressId = exception.reportAddressId;
    this.reportUserId = exception.reportUserId;
    this.barCode = exception.barCode;
    this.workOrderId = exception.workOrderId;
    this.tranId = exception.tranId;
    this.addressDetail = exception.addressDetail;
    this.attachmentList = exception.attachmentList;
  }
}
