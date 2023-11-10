import { Observable } from 'rxjs';
import { PageableBase } from 'src/app/common/model/pageable-base.model';
import { ExceptionalSituationSearchModel } from 'src/app/common/model/company/exceptional-situation-search.model';

export interface ExceptionalSituationHttpServiceInterface {
 
  /**
   * 根据条件查找异常信息
   * 
   * @param condition the PageableBase<CompanySearchModel>
   */
  getExceptionByComdition(condition: PageableBase<ExceptionalSituationSearchModel>): Observable<any>;

}
