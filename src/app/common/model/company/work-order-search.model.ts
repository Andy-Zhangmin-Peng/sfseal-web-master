/*
 * Copyright 2020 Wanyun Corporation. All Rights Reserved.
 */

import { WorkOrderModel } from './work-order.model';

export class WorkOrderSearchModel extends WorkOrderModel {
    workOrderStatusIdList: number[] = [];
    startAddress: string;
    endAddress: string;
}
