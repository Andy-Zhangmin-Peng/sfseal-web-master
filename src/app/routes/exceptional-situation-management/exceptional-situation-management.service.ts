import { Injectable, Inject } from '@angular/core';
import { ExceptionalSituationHttpServiceInterface } from '@core/services/http/exceptional-situation-http.service.interface';
import { PageableBase } from 'src/app/common/model/pageable-base.model';
import { ExceptionalSituationSearchModel } from 'src/app/common/model/company/exceptional-situation-search.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExceptionalSituationManagementService {

  constructor(
    @Inject('ExceptionalSituationHttpServiceInterface')
    private readonly exceptionalSituationHttpServiceInterface: ExceptionalSituationHttpServiceInterface,
  ) { }

  /**
   * 根据条件查找异常信息
   * 
   * @param condition the PageableBase<ExceptionalSituationSearchModel>
   */
  getExceptionByComdition(condition: PageableBase<ExceptionalSituationSearchModel>): Observable<any>{
    
    return this.exceptionalSituationHttpServiceInterface.getExceptionByComdition(condition);
  }
}
