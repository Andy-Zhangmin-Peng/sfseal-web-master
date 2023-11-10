/*
 * Copyright 2020 Wanyun Corporation. All Rights Reserved.
 */

import { BaseModel } from '../base.model';

export class RoleModel extends BaseModel {
  roleId: number;
  roleName: string;
  description: string;
  usage: string;

  constructor(role?) {
    super(role);
    role = role || {};
    this.roleId = role.roleId;
    this.roleName = role.roleName;
    this.description = role.description;
    this.usage = role.usage;
  }
}
