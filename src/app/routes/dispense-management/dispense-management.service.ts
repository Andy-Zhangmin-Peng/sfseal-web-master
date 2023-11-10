import { Injectable, Inject } from '@angular/core';
import { LockHttpServiceInterface } from '@core/services/http/lock-http.service.interface';
import { PageableBase } from 'src/app/common/model/pageable-base.model';
import { DispenseRecordSearchModel } from 'src/app/common/model/company/dispense-record-search.model';
import { Observable } from 'rxjs';
import { CompanyHttpServiceInterface } from '@core/services/http/company-http.service.interface';
import { DispenseRecordModel } from 'src/app/common/model/company/dispense-record.model';

@Injectable({
  providedIn: 'root'
})
export class DispenseManagementService {

  constructor(
    @Inject('LockHttpServiceInterface')
    private readonly lockHttpServiceInterface: LockHttpServiceInterface,
    @Inject('CompanyHttpServiceInterface')
    private readonly companyHttpServiceInterface: CompanyHttpServiceInterface,
  ) { }


  /**
   * 根据条件查找锁 
   * 
   * @param condition PageableBase<LockSearchModel>
   */
  getDispenseRecordByConditon(condition: PageableBase<DispenseRecordSearchModel>): Observable<any> {
    return this.lockHttpServiceInterface.getDispenseRecordByCondition(condition);
  }

  /**
   * 根据分发记录编号查找所有RFID
   * 
   * @param dispenseRecordId the dispenseRecordId
   */
  getAllRfidByDispenseRecordId(dispenseRecordId: number): Observable<any>{
    return this.lockHttpServiceInterface.getAllRfidByDispenseRecordId(dispenseRecordId);
  }

  /**
   * 根据分发记录编号撤回分发
   * 
   * @param dispenseRecordId the dispenseRecordId
   */
  rollbackLocks(dispenseRecordId: number): Observable<any>{
    return this.lockHttpServiceInterface.rollbackLocks(dispenseRecordId);
  }

  /**
   * 查询所有公司信息
   */
  getAllCompanies(): Observable<any> {
    return this.companyHttpServiceInterface.getAllCompany();
  }

  /**
   * 重新分发
   * @param dispenseRecord DispenseRecordModel
   */
  redispense(dispenseRecord: DispenseRecordModel): Observable<any> {
    return this.lockHttpServiceInterface.redispense(dispenseRecord);
  }
}
