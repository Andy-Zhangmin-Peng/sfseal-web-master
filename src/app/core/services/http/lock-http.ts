import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UrlConstant } from 'src/app/common/constant/url.constant';
import { PageableBase } from 'src/app/common/model/pageable-base.model';
import { LockHttpServiceInterface } from './lock-http.service.interface';
import { LockSearchModel } from 'src/app/common/model/company/lock-search.model';
import { LockModel } from 'src/app/common/model/company/lock.model';
import { DispenseRecordSearchModel } from 'src/app/common/model/company/dispense-record-search.model';
import { DispenseRecordModel } from 'src/app/common/model/company/dispense-record.model';
import { ImportRecordSearchModel } from 'src/app/common/model/company/import-record-search.model';

@Injectable()
export class LockHttpService implements LockHttpServiceInterface {

  constructor(private readonly _httpClient: HttpClient) {
  }

  getLockSealInfoByBarCode(barcode: string): Observable<any> {
    return this._httpClient.get(`${UrlConstant.LOCK}/${UrlConstant.SFSEALINFO}/${barcode}`);
  }

  /**
   * 根据条件查找公司信息
   * 
   * @param condition PageableBase<LockSearchModel>
   */
  getLocksByCondition(condition: PageableBase<LockSearchModel>): Observable<any> {
    return this._httpClient.post(`${UrlConstant.LOCK}/${UrlConstant.QUERY}`,condition);
  }

  /**
   * 查询未使用的锁
   * 
   * @param searchModel LockSearchModel
   */
  getLocksForWorkOrder(searchModel: LockSearchModel): Observable<any> {
    return this._httpClient.post(`${UrlConstant.LOCK}/${UrlConstant.WORKORDER}`,searchModel);
  }
  
  /**
   * 批量导入锁
   * 
   * @param formData FormData
   */
  importLocks(formData: FormData): Observable<any> {
    return this._httpClient.post(`${UrlConstant.LOCK}/${UrlConstant.IMPORTS}`,formData);
  }

  updateLock(lock: LockModel): Observable<any> {
    return this._httpClient.post(`${UrlConstant.LOCK}`,lock);
  }

  /**
   * 批量分发
   * 
   * @param companyId the id of company
   * @param lockRfidList the list of RFID
   */
  dispenseLock(companyId:number, lockRfidList: any): Observable<any>{
    return this._httpClient.post(`${UrlConstant.LOCK}/${UrlConstant.DISPENSE}/${companyId}`,lockRfidList);
  }

  /**
   * 
   * @param lockRfidList the list of RFID
   */
  removeLock(lockRfidList: any): Observable<any> {
    return this._httpClient.post(`${UrlConstant.LOCK}/${UrlConstant.REMOVE}`,lockRfidList);
  }


  /**
   * 根据条件查找分发记录
   * 
   * @param condition PageableBase<SearchModel>
   */
  getDispenseRecordByCondition(condition: PageableBase<DispenseRecordSearchModel>): Observable<any> {
    return this._httpClient.post(`${UrlConstant.LOCK}/${UrlConstant.DISPENSE}/${UrlConstant.QUERY}`,condition);
  }
  
  /**
   * 根据条件查找分发记录
   * 
   * @param condition PageableBase<SearchModel>
   */
  getImportRecordByCondition(condition: PageableBase<ImportRecordSearchModel>): Observable<any> {
    return this._httpClient.post(`${UrlConstant.LOCK}/${UrlConstant.IMPORTS}/${UrlConstant.QUERY}`,condition);
  }

  /**
   * 根据分发记录编号查找所有RFID
   * 
   * @param dispenseRecordId the dispenseRecordId
   */
  getAllRfidByDispenseRecordId(dispenseRecordId: number): Observable<any>{
    return this._httpClient.get(`${UrlConstant.LOCK}/${UrlConstant.DISPENSE}?dispenseRecordId=${dispenseRecordId}`);
  }

  /**
   * 根据分发记录编号撤回
   * 
   * @param dispenseRecordId the dispenseRecordId
   */
  rollbackLocks(dispenseRecordId: number): Observable<any>{
    return this._httpClient.get(`${UrlConstant.LOCK}/${UrlConstant.ROLLBACK}?dispenseRecordId=${dispenseRecordId}`);
  }

  /**
   * 重新分发
   * 
   * @param dispenseRecord the DispenseRecordModel
   */
  redispense(dispenseRecord: DispenseRecordModel): Observable<any> {
    return this._httpClient.post(`${UrlConstant.LOCK}/${UrlConstant.REDISPENSE}`, dispenseRecord);
  }

  /**
   * 接收分发
   * 
   * @param dispenseRecord the DispenseRecordModel
   */
  recieve(dispenseRecord: DispenseRecordModel): Observable<any> {
    return this._httpClient.post(`${UrlConstant.LOCK}/${UrlConstant.RECEIVE}`, dispenseRecord);
  }

  /**
   * 采购电子封锁
   * @param count purchCount
   */
  purchLocks(count: number): Observable<any> {
    return this._httpClient.get(`${UrlConstant.LOCK}/${UrlConstant.PURCH}?purchCount=${count}`);
  }

  /**
   * 根据导入记录ID查找RFID
   * @param importId the id of lock import record
   */
  getRfidsByImportId(importId: number): Observable<any> {
    return this._httpClient.get(`${UrlConstant.LOCK}/${UrlConstant.IMPORTS}?importId=${importId}`);
  }
  
}
