import { Observable } from 'rxjs';
import { DepartmentSearchModel } from 'src/app/common/model/company/department-search.model';
import { PageableBase } from 'src/app/common/model/pageable-base.model';
import { DepartmentModel } from 'src/app/common/model/company/department.model';
import { CompanySearchModel } from 'src/app/common/model/company/company-search.model';
import { CompanyModel } from 'src/app/common/model/company/company.model';
import { InventorySearchModel } from 'src/app/common/model/company/inventory-search.model';

export interface CompanyHttpServiceInterface {
  /**
   * 获取所有公司信息
   */
  getAllCompany(): Observable<any>;

  /**
   * 根据条件查找公司信息
   * 
   * @param condition the PageableBase<CompanySearchModel>
   */
  getCompaniesByComdition(condition: PageableBase<CompanySearchModel>): Observable<any>;

  /**
   * 更新企业信息
   * 
   * @param company companyModel
   */
  updateCompany(company: CompanyModel): Observable<any>;

  /**
   * 创建企业信息
   * 
   * @param company companyModel
   */
  createCompany(company: CompanyModel): Observable<any>;

  /**
   * 根据条件查找部门信息
   * 
   * @param condition PageableBase<DepartmentSearchModel>
   */
  getAllDepartmentsByCondition(condition: PageableBase<DepartmentSearchModel>): Observable<any>;

  /**
   * 创建部门
   * @param departmentModel the DepartmentModel
   */
  createDepartment(departmentModel : DepartmentModel): Observable<any>;

  /**
   * 更新部门
   * @param departmentModel the DepartmentModel
   */
  updateDepartment(departmentModel : DepartmentModel): Observable<any>;

  /**
   * 校验数据是否已经存在
   * @param valueType 需要校验的元素
   * @param value 需要校验的值
   */
  checkCompanyExistingValue(valueType: string, value: string): Observable<any>;

  /**
   * 校验数据是否已经存在
   * @param valueType 需要校验的元素
   * @param value 需要校验的值
   */
  checkDepartmentExistingValue(valueType: string, value: string): Observable<any>;

  /**
   * 根据条件查找库存信息
   * @param condition PageableBase<InventorySearchModel>
   */
  getAllInventoryByCondition(condition: PageableBase<InventorySearchModel>): Observable<any>;

  /**
   * 获取当前公司库存信息
   */
  getCurrentyUserInventory(): Observable<any>;
}
