import { CompanyHttpServiceInterface } from './company-http.service.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UrlConstant } from 'src/app/common/constant/url.constant';
import { DepartmentSearchModel } from 'src/app/common/model/company/department-search.model';
import { PageableBase } from 'src/app/common/model/pageable-base.model';
import { CompanySearchModel } from 'src/app/common/model/company/company-search.model';
import { CompanyModel } from 'src/app/common/model/company/company.model';
import { DepartmentModel } from 'src/app/common/model/company/department.model';
import { InventorySearchModel } from 'src/app/common/model/company/inventory-search.model';

@Injectable()
export class CompanyHttpService implements CompanyHttpServiceInterface {

  constructor(private readonly _httpClient: HttpClient) {
  }

  /**
   * 获取所有公司信息
   */
  getAllCompany(): Observable<any> {
    return this._httpClient.get(`${UrlConstant.COMPANY}`);
  }

  /**
   * 根据条件查找公司信息
   * 
   * @param condition PageableBase<CompanySearchModel>
   */
  getCompaniesByComdition(condition: PageableBase<CompanySearchModel>): Observable<any> {
    return this._httpClient.post(`${UrlConstant.COMPANY}/${UrlConstant.QUERY}`,condition);
  }

  /**
   * 更新企业信息
   * 
   * @param company CompanyModel
   */
  updateCompany(company: CompanyModel): Observable<any> {
    return this._httpClient.put(`${UrlConstant.COMPANY}`, company);
  }

  /**
   * 更新企业信息
   * 
   * @param company CompanyModel
   */
  createCompany(company: CompanyModel): Observable<any> {
    return this._httpClient.post(`${UrlConstant.COMPANY}`, company);
  }

  getAllDepartmentsByCondition(condition: PageableBase<DepartmentSearchModel>): Observable<any> {
    return this._httpClient.post(`${UrlConstant.COMPANY}/${UrlConstant.DEPARTMENT}/${UrlConstant.QUERY}`,condition);
  }

   /**
    * 创建部门
    * @param departmentSearchModel the DepartmentSearchModel
    */
  createDepartment(departmentModel : DepartmentModel): Observable<any> {
    return this._httpClient.post(`${UrlConstant.COMPANY}/${UrlConstant.DEPARTMENT}`,departmentModel);
  }


   /**
    * 创建部门
    * @param departmentModel the DepartmentModel
    */
   updateDepartment(departmentModel : DepartmentModel): Observable<any> {
    return this._httpClient.put(`${UrlConstant.COMPANY}/${UrlConstant.DEPARTMENT}`,departmentModel);
  }

  /**
   * 校验数据是否已经存在
   * @param valueType 需要校验的元素
   * @param value 需要校验的值
   */
  checkDepartmentExistingValue(valueType: string, value: string): Observable<any> {
    return this._httpClient.get(`${UrlConstant.COMPANY}/${UrlConstant.DEPARTMENT}/${UrlConstant.VALUECHECK}/${valueType}?value=${value}`);
  }

  /**
   * 校验数据是否已经存在
   * @param valueType 需要校验的元素
   * @param value 需要校验的值
   */
  checkCompanyExistingValue(valueType: string, value: string): Observable<any> {
    return this._httpClient.get(`${UrlConstant.COMPANY}/${UrlConstant.VALUECHECK}/${valueType}?value=${value}`);
  }

  /**
   * 根据条件查找库存信息
   * @param condition PageableBase<InventorySearchModel>
   */
  getAllInventoryByCondition(condition: PageableBase<InventorySearchModel>): Observable<any> {
    return this._httpClient.post(`${UrlConstant.COMPANY}/${UrlConstant.INVENTORY}/${UrlConstant.QUERY}`,condition);
  }

  /**
   * 获取当前公司库存信息
   */
  getCurrentyUserInventory(): Observable<any> {
    return this._httpClient.get(`${UrlConstant.COMPANY}/${UrlConstant.INVENTORY}`);
  }
}
