/*
 * Copyright 2020 Wanyun Corporation. All Rights Reserved.
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlConstant } from '../../../common/constant/url.constant';
import { StaffHttpServiceInterface } from './staff-http.service.interface';
import { StaffSearchModel } from 'src/app/common/model/staff/staff-search.model';
import { PageableBase } from 'src/app/common/model/pageable-base.model';
import { AccountModel } from 'src/app/common/model/user/account.model';

@Injectable()
export class StaffHttpService implements StaffHttpServiceInterface {
  constructor(private readonly _httpClient: HttpClient) {}

  /**
   * 根据登录账号ID获取企业管理员信息
   *
   * @param accountId the accountId
   */
  getStaffByAccountId(accountId: number): Observable<any> {
    return this._httpClient.get(`${UrlConstant.ACCOUNT}/${UrlConstant.STAFF}/${accountId}`);
  }

  /**
   * 根据运营商ID获取所有的企业管理员信息
   *
   * @param operatorId the operatorId
   */
  getAllStaffByOperatorId(operatorId: number): Observable<any> {
    return this._httpClient.get(`${UrlConstant.STAFF}?operatorId=${operatorId}`);
  }

  /**
   * 根据条件获取企业管理员信息
   *
   * @param condition the PageableStaffModel
   */
  queryStaffByCondition(condition: PageableBase<StaffSearchModel>): Observable<any> {
    return this._httpClient.post(`${UrlConstant.ACCOUNT}/${UrlConstant.STAFF}/${UrlConstant.QUERY}`, condition);
  }

  /**
   * 获取所有企业管理员信息
   *
   */
  getAllStaff(): Observable<any> {
    return this._httpClient.get(UrlConstant.STAFF);
  }

  /**
   * 创建一个企业管理员信息
   *
   * @param account the AccountModel
   */
  createFullStaff(account: AccountModel): Observable<any> {
    return this._httpClient.post(`${UrlConstant.ACCOUNT}/${UrlConstant.STAFF}`, account);
  }

  /**
   * 更新一个企业管理员信息
   *
   * @param account the AccountModel
   */
  updateFullStaff(account: AccountModel): Observable<any> {
    return this._httpClient.put(`${UrlConstant.ACCOUNT}/${UrlConstant.STAFF}`, account);
  }

  /**
   * 根据账户ID删除对应的企业管理员信息
   *
   * @param accountId the accountId
   */
  removeStaffByAccountId(accountId: number): Observable<any> {
    return this._httpClient.delete(`${UrlConstant.ACCOUNT}/${UrlConstant.STAFF}/${accountId}`);
  }

  /**
   * 校验数据是否已经存在
   * @param valueType 需要校验的元素
   * @param value 需要校验的值
   */
  checkExistingValue(valueType: string, value: string): Observable<any> {
    return this._httpClient.get(`${UrlConstant.ACCOUNT}/${UrlConstant.STAFF}/${UrlConstant.VALUECHECK}/${valueType}?value=${value}`);
  }

  /**
   * 根据账户ID查询账户信息
   */
  getFullAccountByAccountId(accountId: number): Observable<any> {
    return this._httpClient.get(`${UrlConstant.ACCOUNT}/${UrlConstant.STAFF}/${UrlConstant.ACCOUNT}?accountId=${accountId}`);
  }
}
