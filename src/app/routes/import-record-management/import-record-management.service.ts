import { Injectable, Inject } from '@angular/core';
import { LockHttpServiceInterface } from '@core/services/http/lock-http.service.interface';
import { PageableBase } from 'src/app/common/model/pageable-base.model';
import { ImportRecordSearchModel } from 'src/app/common/model/company/import-record-search.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImportRecordManagementService {

  constructor(
    @Inject('LockHttpServiceInterface')
    private readonly lockHttpServiceInterface: LockHttpServiceInterface,
  ) { }

  /**
   * 根据条件查找导入记录
   * 
   * @param condition PageableBase<ImportRecordSearchModel>
   */
  getDispenseRecordByConditon(condition: PageableBase<ImportRecordSearchModel>): Observable<any> {
    return this.lockHttpServiceInterface.getImportRecordByCondition(condition);
  }
  
  /**
   * 根据导入记录ID查找RFID
   * @param importId the id of lock import record
   */
  getRfidsByImportId(importId: number): Observable<any> {
    return this.lockHttpServiceInterface.getRfidsByImportId(importId);
  }
}
