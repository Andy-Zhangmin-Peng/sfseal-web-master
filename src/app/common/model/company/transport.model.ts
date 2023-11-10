/*
 * Copyright 2020 Wanyun Corporation. All Rights Reserved.
 */

import { BaseModel } from '../base.model';

export class TransportModel extends BaseModel {
   id: number;
   transprortId: string;
   companyId: number;
    
  constructor(transport?) {
    super(transport);
    transport = transport || {};
    this.id = transport.id;
    this.transprortId = transport.transprortId;
    this.companyId = transport.companyId;
  }
}
