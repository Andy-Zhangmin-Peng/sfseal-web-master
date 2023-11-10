import { Injectable, Inject } from '@angular/core';
import { CompanyHttpServiceInterface } from '@core/services/http/company-http.service.interface';
import { CompanyModel } from 'src/app/common/model/company/company.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyInfoService {

  constructor(
    @Inject('CompanyHttpServiceInterface')
    private readonly companyHttpServiceInterface: CompanyHttpServiceInterface
  ) { }

  updateCompany(company: CompanyModel): Observable<any> {
    return this.companyHttpServiceInterface.updateCompany(company);
  }
}
