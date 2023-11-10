/*
 * Copyright 2020 Wanyun Corporation. All Rights Reserved.
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlConstant } from '../../../common/constant/url.constant';
import { UserHttpServiceInterface } from './user-http.service.interface';
import { PageableBase } from "../../../common/model/pageable-base.model";
import { UserSearchModel } from "../../../common/model/user/user-search.model";
import { AccountModel } from 'src/app/common/model/user/account.model';

@Injectable()
export class UserHttpService implements UserHttpServiceInterface {
  constructor(private readonly _httpClient: HttpClient) {
  }

  /**
   * 根据条件查找用户信息
   */
  queryUserByCondition(condition: PageableBase<UserSearchModel>): Observable<any> {
    return this._httpClient.post(`${UrlConstant.ACCOUNT}/${UrlConstant.USER}/${UrlConstant.QUERY}`, condition);
  }

  /**
   * 创建一个企业管理员信息
   *
   * @param account the AccountModel
   */
  createFullUser(account: AccountModel): Observable<any> {
    return this._httpClient.post(`${UrlConstant.ACCOUNT}/${UrlConstant.USER}`, account);
  }
    
  /**
   * 更新一个终端用户信息
   *
   * @param account the AccountModel
   */
  updateFullUser(account: AccountModel): Observable<any> {
    return this._httpClient.put(`${UrlConstant.ACCOUNT}/${UrlConstant.USER}`, account);
  }

  /**
   * 根据账户ID删除对应的终端用户信息
   *
   * @param accountId the accountId
   */
  removeUserByAccountId(accountId: number): Observable<any> {
    return this._httpClient.delete(`${UrlConstant.ACCOUNT}/${UrlConstant.USER}/${accountId}`);
  }
}
