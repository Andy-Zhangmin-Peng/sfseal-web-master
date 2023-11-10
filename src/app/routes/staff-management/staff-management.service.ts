import { Injectable, Inject } from '@angular/core';
import { Resolve } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StaffHttpServiceInterface } from '@core/services/http/staff-http.service.interface';
import { StaffSearchModel } from 'src/app/common/model/staff/staff-search.model';
import { PageableBase } from 'src/app/common/model/pageable-base.model';
import { StaffModel } from 'src/app/common/model/staff/staff.model';
import { CompanyHttpServiceInterface } from '@core/services/http/company-http.service.interface';
import { UserHttpServiceInterface } from '@core/services/http/user-http.service.interface';
import { AccountModel } from 'src/app/common/model/user/account.model';

@Injectable()
export class StaffManagementService implements Resolve<any> {
  constructor(
    @Inject('StaffHttpServiceInterface')
    private readonly staffHttpServiceInterface: StaffHttpServiceInterface,
    @Inject('CompanyHttpServiceInterface')
    private readonly companyHttpServiceInterface: CompanyHttpServiceInterface,
    @Inject('UserHttpServiceInterface')
    private readonly userHttpServiceInterface: UserHttpServiceInterface,
  ) {}

  resolve(
    route: import('@angular/router').ActivatedRouteSnapshot,
    state: import('@angular/router').RouterStateSnapshot,
  ) {
    throw new Error('Method not implemented.');
  }

  /**
   * 根据条件获取企业管理员信息
   *
   * @param condition the PageableStaffModel
   */
  queryStaffByCondition(condition: PageableBase<StaffSearchModel>): Observable<any> {
    return this.staffHttpServiceInterface.queryStaffByCondition(condition);
  }

  /**
   * 创建一个企业管理员信息
   *
   * @param account the AccountModel
   */
  createStaff(account: AccountModel): Observable<any> {
    return this.staffHttpServiceInterface.createFullStaff(account);
  }

  /**
   * 更新一个企业管理员信息
   *
   * @param account the StaffModel
   */
  updateFullStaff(account: AccountModel): Observable<any> {
    return this.staffHttpServiceInterface.updateFullStaff(account);
  }

  /**
   * 根据运营商ID获取对应的所有企业
   *
   */
  getAllCompanies(): Observable<any> {
    return this.companyHttpServiceInterface.getAllCompany();
  }

  /**
   * 校验数据是否已经存在
   * @param valueType 需要校验的元素
   * @param value 需要校验的值
   */
  checkExistingValue(valueType: string, value: string): Observable<any> {
    return this.staffHttpServiceInterface.checkExistingValue(valueType, value);
  }

  getFullAccountByAccountId(accountId: number): Observable<any> {
    return this.staffHttpServiceInterface.getFullAccountByAccountId(accountId);
  }

  removeStaffByAccountId(accountId: number): Observable<any> {
    return this.staffHttpServiceInterface.removeStaffByAccountId(accountId);
  }
}
