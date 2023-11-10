import { Injectable, Inject } from '@angular/core';
import { CompanyHttpServiceInterface } from '@core/services/http/company-http.service.interface';
import { CompanySearchModel } from 'src/app/common/model/company/company-search.model';
import { PageableBase } from 'src/app/common/model/pageable-base.model';
import { Observable } from 'rxjs';
import { CompanyModel } from 'src/app/common/model/company/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyManagementService {

  constructor(    
     @Inject('CompanyHttpServiceInterface')
     private readonly companyHttpServiceInterface: CompanyHttpServiceInterface) { }

     getCompanyByCondition(condition: PageableBase<CompanySearchModel>): Observable<any> {
      return this.companyHttpServiceInterface.getCompaniesByComdition(condition)
  
    }

    updateCompany(company: CompanyModel): Observable<any> {
      return this.companyHttpServiceInterface.updateCompany(company);
    }

    createCompany(company: CompanyModel): Observable<any> {
      return this.companyHttpServiceInterface.createCompany(company);
    }
  
  /**
   * 校验数据是否已经存在
   * @param valueType 需要校验的元素
   * @param value 需要校验的值
   */
  checkExistingValue(valueType: string, value: string): Observable<any> {
    return this.companyHttpServiceInterface.checkCompanyExistingValue(valueType, value);
  }
}
