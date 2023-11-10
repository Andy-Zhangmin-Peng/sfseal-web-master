/*
 * Copyright 2020 Wanyun Corporation. All Rights Reserved.
 */

import { InventoryModel } from './inventory.model';

export class InventorySearchModel extends InventoryModel {

  purchaseStartDate: Date;

  purchaseEndate: Date;

  unusedCountFrom: number;

  unusedCountTo: number;

}
