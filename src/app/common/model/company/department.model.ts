/*
 * Copyright 2020 Wanyun Corporation. All Rights Reserved.
 */

import { BaseModel } from '../base.model';

export class DepartmentModel extends BaseModel {
  departmentId: number;
  departmentName: string;
  departmentPhoneNumber: string;
  departmentAdministrator: string;

  constructor(department?) {
    super(department);

    department = department || {};
    this.departmentId = department.departmentId;
    this.departmentName = department.departmentName;
    this.departmentPhoneNumber = department.phoneNumber;
    this.departmentAdministrator = department.address;
  }
}
