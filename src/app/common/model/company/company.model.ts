/*
 * Copyright 2020 Wanyun Corporation. All Rights Reserved.
 */

import { BaseModel } from '../base.model';

export class CompanyModel extends BaseModel {
  companyId: number;
  companyName: string;
  phoneNumber: string;
  address: string;
  email:string;

  constructor(company?) {
    super(company);

    company = company || {};
    this.companyId = company.companyId;
    this.companyName = company.companyName;
    this.phoneNumber = company.phoneNumber;
    this.address = company.address;
    this.email = company.email;

  }
}
