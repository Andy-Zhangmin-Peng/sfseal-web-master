import { Injectable, Inject } from '@angular/core';
import { UserHttpServiceInterface } from '@core/services/http/user-http.service.interface';
import { PageableBase } from 'src/app/common/model/pageable-base.model';
import { UserSearchModel } from 'src/app/common/model/user/user-search.model';
import { Observable } from 'rxjs';
import { StaffHttpServiceInterface } from '@core/services/http/staff-http.service.interface';
import { AccountModel } from 'src/app/common/model/user/account.model';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  constructor(
    @Inject('UserHttpServiceInterface')
    private readonly userHttpServiceInterface: UserHttpServiceInterface,
    @Inject('StaffHttpServiceInterface')
    private readonly staffHttpServiceInterface: StaffHttpServiceInterface,
  ) { }

  /**
   * 根据条件获取终端用户信息
   *
   * @param condition the PageableStaffModel
   */
  queryUserByCondition(condition: PageableBase<UserSearchModel>): Observable<any> {
    return this.userHttpServiceInterface.queryUserByCondition(condition);
  }

  getFullAccountByAccountId(accountId: number): Observable<any> {
    return this.staffHttpServiceInterface.getFullAccountByAccountId(accountId);
  }

  /**
   * 校验数据是否已经存在
   * @param valueType 需要校验的元素
   * @param value 需要校验的值
   */
  checkExistingValue(valueType: string, value: string): Observable<any> {
    return this.staffHttpServiceInterface.checkExistingValue(valueType, value);
  }

  /**
   * 创建一个终端用户
   *
   * @param account the AccountModel
   */
  createUser(account: AccountModel): Observable<any> {
    return this.userHttpServiceInterface.createFullUser(account);
  }

  /**
   * 更新一个终端用户信息
   *
   * @param account the StaffModel
   */
  updateFullUser(account: AccountModel): Observable<any> {
    return this.userHttpServiceInterface.updateFullUser(account);
  }

  /**
   * 禁用一个终端用户
   * 
   * @param accountId id of account
   */
  removeUserByAccountId(accountId: number): Observable<any> {
    return this.userHttpServiceInterface.removeUserByAccountId(accountId);
  }
}
