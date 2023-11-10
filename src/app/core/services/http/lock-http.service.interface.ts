import { Observable } from 'rxjs';
import { PageableBase } from 'src/app/common/model/pageable-base.model';
import { LockSearchModel } from 'src/app/common/model/company/lock-search.model';
import { LockModel } from 'src/app/common/model/company/lock.model';
import { DispenseRecordSearchModel } from 'src/app/common/model/company/dispense-record-search.model';
import { DispenseRecordModel } from 'src/app/common/model/company/dispense-record.model';
import { ImportRecordSearchModel } from 'src/app/common/model/company/import-record-search.model';

export interface LockHttpServiceInterface {
  
  /**
   * 根据条件查找电子封锁信息
   * 
   * @param condition the PageableBase<CompanySearchModel>
   */
  getLocksByCondition(condition: PageableBase<LockSearchModel>): Observable<any>;

  /**
   * 查询未使用的锁
   * 
   * @param searchModel LockSearchModel
   */
  getLocksForWorkOrder(searchModel: LockSearchModel): Observable<any> ;

  /**
   * 批量导入锁
   * 
   * @param formData FormData
   */
  importLocks(formData: FormData): Observable<any>;

  /**
   * 更新锁信息
   * 
   * @param lock LockModel
   */
  updateLock(lock: LockModel): Observable<any>;

  /**
   * 批量分发
   * 
   * @param companyId the id of company
   * @param lockRfidList the list of RFID
   */
  dispenseLock(companyId:number, lockRfidList: any): Observable<any>;

  /**
   * 批量删除
   * 
   * @param lockRfidList the list of RFID
   */
  removeLock(lockRfidList: any): Observable<any>;

  /**
   * 根据条件查找分发记录
   * 
   * @param condition PageableBase<DispenseRecordSearchModel>
   */
  getDispenseRecordByCondition(condition: PageableBase<DispenseRecordSearchModel>): Observable<any>;

  /**
   * 根据条件查找分发记录
   * 
   * @param condition PageableBase<SearchModel>
   */
  getImportRecordByCondition(condition: PageableBase<ImportRecordSearchModel>): Observable<any> ;

  /**
   * 根据分发记录编号查找所有RFID
   * 
   * @param dispenseRecordId the dispenseRecordId
   */
  getAllRfidByDispenseRecordId(dispenseRecordId: number): Observable<any>;


  /**
   * 根据分发记录编号查找所有RFID
   * 
   * @param dispenseRecordId the dispenseRecordId
   */
  rollbackLocks(dispenseRecordId: number): Observable<any>;

  /**
   * 重新分发
   * 
   * @param dispenseRecord the DispenseRecordModel
   */
  redispense(dispenseRecord: DispenseRecordModel): Observable<any>;

  /**
   * 接收分发
   * 
   * @param dispenseRecord the DispenseRecordModel
   */
  recieve(dispenseRecord: DispenseRecordModel): Observable<any>;

  /**
   * 采购电子封锁
   * @param count purchCount
   */
  purchLocks(count: number): Observable<any>;

  /**
   * 根据导入记录ID查找RFID
   * @param importId the id of lock import record
   */
  getRfidsByImportId(importId: number): Observable<any>;

  getLockSealInfoByBarCode(barcode: string): Observable<any>;
}
