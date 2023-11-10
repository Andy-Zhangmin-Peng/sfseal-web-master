import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageableBase } from 'src/app/common/model/pageable-base.model';
import { ExceptionalSituationSearchModel } from 'src/app/common/model/company/exceptional-situation-search.model';
import { HttpClient } from '@angular/common/http';
import { UrlConstant } from 'src/app/common/constant/url.constant';
import { ExceptionalSituationHttpServiceInterface } from './exceptional-situation-http.service.interface';


@Injectable()
export class ExceptionalSituationHttpService implements ExceptionalSituationHttpServiceInterface {
  
  constructor(private readonly _httpClient: HttpClient) {
  }

  /**
   * 根据条件查找异常信息
   * 
   * @param condition the PageableBase<ExceptionalSituationSearchModel>
   */
  getExceptionByComdition(condition: PageableBase<ExceptionalSituationSearchModel>): Observable<any>{
    
    return this._httpClient.post(`${UrlConstant.SEAL}/${UrlConstant.QUERY}`,condition);
  }
}
