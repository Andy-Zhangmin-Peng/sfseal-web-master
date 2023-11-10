import { Injectable, Inject } from '@angular/core';
import { CompanyHttpServiceInterface } from '@core/services/http/company-http.service.interface';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { StaffSearchModel } from 'src/app/common/model/staff/staff-search.model';
import { PageableBase } from 'src/app/common/model/pageable-base.model';
import { DepartmentSearchModel } from 'src/app/common/model/company/department-search.model';
import { DepartmentModel } from 'src/app/common/model/company/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentManagementService implements Resolve<any> {

  constructor(
     @Inject('CompanyHttpServiceInterface')
     private readonly companyHttpServiceInterface: CompanyHttpServiceInterface) { }

     resolve(
      route: import('@angular/router').ActivatedRouteSnapshot,
      state: import('@angular/router').RouterStateSnapshot,
    ) {
      throw new Error('Method not implemented.');
    }

  getDepartmentsByCondition(condition: PageableBase<DepartmentSearchModel>): Observable<any> {
    return this.companyHttpServiceInterface.getAllDepartmentsByCondition(condition)

  }

  updateDepartment(department: DepartmentModel): Observable<any> {
    return this.companyHttpServiceInterface.updateDepartment(department);
  }

  createDepartment(department: DepartmentModel): Observable<any> {
    return this.companyHttpServiceInterface.createDepartment(department);
  }

  /**
   * 校验数据是否已经存在
   * @param valueType 需要校验的元素
   * @param value 需要校验的值
   */
  checkExistingValue(valueType: string, value: string): Observable<any> {
    return this.companyHttpServiceInterface.checkDepartmentExistingValue(valueType, value);
  }
}
