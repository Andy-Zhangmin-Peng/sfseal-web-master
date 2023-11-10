/*
 * Copyright 2020 Wanyun Corporation. All Rights Reserved.
 */

import { BaseModel } from '../base.model';

export class AttachmentModel extends BaseModel {
  attachmentId: number;
  attachmentCode: string;
  attachmentType: number;
  attachmentName: string;
  constructor(attachment?) {
    super(attachment);
    this.attachmentId = attachment.attachmentId;
    this.attachmentCode = attachment.attachmentCode;
    this.attachmentType = attachment.attachmentType;
    this.attachmentName = attachment.attachmentName;
  }
}
