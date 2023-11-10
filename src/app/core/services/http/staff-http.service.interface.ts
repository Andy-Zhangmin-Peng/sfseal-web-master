/*
 * Copyright 2020 Wanyun Corporation. All Rights Reserved.
 */

import { Observable } from 'rxjs';
import { StaffSearchModel } from 'src/app/common/model/staff/staff-search.model';
import { PageableBase } from 'src/app/common/model/pageable-base.model';
import { AccountModel } from 'src/app/common/model/user/account.model';

export interface StaffHttpServiceInterface {
  /**
   * 根据登录账号ID获取企业管理员信息
   *
   * @param accountId the accountId
   */
  getStaffByAccountId(accountId: number): Observable<any>;

  /**
   * 根据运营商ID获取所有的企业管理员信息
   *
   * @param operatorId the operatorId
   */
  getAllStaffByOperatorId(operatorId: number): Observable<any>;

  /**
   * 根据条件获取企业管理员信息
   *
   * @param condition the PageableStaffModel
   */
  queryStaffByCondition(condition: PageableBase<StaffSearchModel>): Observable<any>;

  /**
   * 获取所有企业管理员信息
   *
   */
  getAllStaff(): Observable<any>;

  /**
   * 创建一个企业管理员信息
   *
   * @param account the AccountModel
   */
  createFullStaff(account: AccountModel): Observable<any>;

  /**
   * 更新一个企业管理员信息
   *
   * @param account the AccountModel
   */
  updateFullStaff(account: AccountModel): Observable<any>;

  /**
   * 根据账户ID删除对应的企业管理员信息
   *
   * @param accountId the accountId
   */
  removeStaffByAccountId(accountId: number): Observable<any>;

  /**
   * 校验数据是否已经存在
   * @param valueType 需要校验的元素
   * @param value 需要校验的值
   */
  checkExistingValue(valueType: string, value: string): Observable<any>;

  /**
   * 根据登录账号ID获取企业管理员
   *
   * @param accountId the accountId
   */
  getFullAccountByAccountId(accountId: number): Observable<any>;
}
