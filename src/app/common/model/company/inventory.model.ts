/*
 * Copyright 2020 Wanyun Corporation. All Rights Reserved.
 */

import { BaseModel } from '../base.model';

export class InventoryModel extends BaseModel {
  latestPurchaseCount: number;
  companyName: string;
  unusedCount: number;
  usedCount: number;
  purchaseCount: number;
  
  constructor(inventory?) {
    super(inventory);

    inventory = inventory || {};
    this.latestPurchaseCount = inventory.latestPurchaseCount;
    this.companyName = inventory.companyName;
    this.unusedCount = inventory.unusedCount;

  }
}
