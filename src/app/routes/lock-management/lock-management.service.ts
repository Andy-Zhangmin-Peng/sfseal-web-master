import { Injectable, Inject } from '@angular/core';
import { LockHttpServiceInterface } from '@core/services/http/lock-http.service.interface';
import { LockSearchModel } from 'src/app/common/model/company/lock-search.model';
import { PageableBase } from 'src/app/common/model/pageable-base.model';
import { Observable } from 'rxjs';
import { CompanyHttpServiceInterface } from '@core/services/http/company-http.service.interface';
import { LockModel } from 'src/app/common/model/company/lock.model';
import { ReferenceHttpServiceInterface } from '@core/services/http/reference-http.service.interface';

@Injectable({
  providedIn: 'root'
})
export class LockManagementService {

  constructor( 
    @Inject('LockHttpServiceInterface')
    private readonly lockHttpServiceInterface: LockHttpServiceInterface,
    @Inject('CompanyHttpServiceInterface')
    private readonly companyHttpServiceInterface: CompanyHttpServiceInterface,
    @Inject('ReferenceHttpServiceInterface')
    private readonly referenceHttpServiceInterface: ReferenceHttpServiceInterface,) { }

  /**
   * 根据条件查找锁 
   * 
   * @param condition PageableBase<LockSearchModel>
   */
  getLocksByConditon(condition: PageableBase<LockSearchModel>): Observable<any> {
    return this.lockHttpServiceInterface.getLocksByCondition(condition);
  }

  /**
   * 查询所有公司信息
   */
  getAllCompanies(): Observable<any> {
    return this.companyHttpServiceInterface.getAllCompany();
  }

  /**
   * 批量导入锁
   * 
   * @param formData FormData
   */
  importLocks(formData: FormData): Observable<any> {
    return this.lockHttpServiceInterface.importLocks(formData);
  }

  updateLock(lock: LockModel): Observable<any> {
    return this.lockHttpServiceInterface.updateLock(lock);
  }

  /**
   * 批量分发
   * 
   * @param companyId the ID of company
   * @param lockRfidList the list of RFID
   */
  dispenseLock(companyId:number, lockRfidList: any): Observable<any>{
    return this.lockHttpServiceInterface.dispenseLock(companyId,lockRfidList);
  }

  removeLock(lockRfidList: any): Observable<any>{ 
    return this.lockHttpServiceInterface.removeLock(lockRfidList);
  }

  /**
   * 根据类别查找所有标签类型
   * @param category string
   */
  getReferenceDataByCategory(category: string): Observable<any> {
    return this.referenceHttpServiceInterface.getReferenceDataByCategory(category);
  }

}
