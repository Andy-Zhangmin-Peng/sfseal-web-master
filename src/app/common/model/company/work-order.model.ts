/*
 * Copyright 2020 Wanyun Corporation. All Rights Reserved.
 */

import { BaseModel } from '../base.model';
import { WorkOrderAddressModel } from './work-order-address.model';
import { LockModel } from './lock.model';
import { TransportModel } from './transport.model';
import { AttachmentModel } from './attachment.model';

export class WorkOrderModel extends BaseModel {
    companyId: number;
    workOrderId: string;
    statusCode: number;
    owner: string;
    carriera: string;
    statusName: string;
    startTime: Date;
    endTime: Date;
    productDetail: string;
    attachmentId: number;
    wayBillNumber: string;
    addressList: Array<WorkOrderAddressModel>;
    lockList: Array<LockModel>;
    transportList: Array<TransportModel>;
    attachment: AttachmentModel;

  constructor(workorder?) {
    super(workorder);

    workorder = workorder || {};
    this.companyId = workorder.companyId;
    this.workOrderId = workorder.workOrderId;
    this.statusCode = workorder.statusCode;
    this.owner = workorder.owner;
    this.carriera = workorder.carriera;
    this.statusName = workorder.statusName; 
    this.startTime = workorder.startTime;
    this.endTime = workorder.endTime;
    this.productDetail = workorder.productDetail;
    this.attachmentId = workorder.attachmentId;
    this.wayBillNumber = workorder.wayBillNumber;
    this.addressList = workorder.addressList;
    this.lockList = workorder.lockList;
    this.transportList = workorder.transportList;
    this.attachment = workorder.attachment;
    
  }
}
