/*
 * Copyright 2020 Wanyun Corporation. All Rights Reserved.
 */

import { BaseModel } from '../base.model';

export class WorkOrderAddressModel extends BaseModel {
    addressId: number;
    workOrderId: string;
    lngLat: any;
    addressType: number;
    addressDetail: string;
    

  constructor(workorderAddress?) {
    super(workorderAddress);

    workorderAddress = workorderAddress || {};
    this.addressId = workorderAddress.addressId;
    this.workOrderId = workorderAddress.workOrderId;
    this.lngLat = workorderAddress.lngLat;
    this.addressType = workorderAddress.addressType;
    this.addressDetail = workorderAddress.addressDetail;
  }
}
