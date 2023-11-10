/*
 * Copyright 2020 Wanyun Corporation. All Rights Reserved.
 */

import { Observable } from 'rxjs';
import { PageableBase } from 'src/app/common/model/pageable-base.model';
import { UserSearchModel } from "../../../common/model/user/user-search.model";
import { AccountModel } from 'src/app/common/model/user/account.model';

export interface UserHttpServiceInterface {

  /**
   * 根据条件获取企业管理员信息
   *
   * @param condition the PageableStaffModel
   */
  queryUserByCondition(condition: PageableBase<UserSearchModel>): Observable<any>;

  /**
   * 创建一个终端用户信息
   *
   * @param account the AccountModel
   */
  createFullUser(account: AccountModel): Observable<any>;

  /**
   * 更新一个终端用户信息
   *
   * @param account the AccountModel
   */
  updateFullUser(account: AccountModel): Observable<any>;
  
  /**
   * 根据账户ID删除对应的终端用户信息
   *
   * @param accountId the accountId
   */
  removeUserByAccountId(accountId: number): Observable<any>;

}
