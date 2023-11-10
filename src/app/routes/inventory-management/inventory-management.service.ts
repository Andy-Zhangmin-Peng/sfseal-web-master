import { Injectable, Inject } from '@angular/core';
import { CompanyHttpServiceInterface } from '@core/services/http/company-http.service.interface';
import { PageableBase } from 'src/app/common/model/pageable-base.model';
import { InventorySearchModel } from 'src/app/common/model/company/inventory-search.model';
import { Observable } from 'rxjs';
import { LockHttpServiceInterface } from '@core/services/http/lock-http.service.interface';
import { DispenseRecordSearchModel } from 'src/app/common/model/company/dispense-record-search.model';
import { DispenseRecordModel } from 'src/app/common/model/company/dispense-record.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryManagementService {

  constructor(
    @Inject('CompanyHttpServiceInterface')
    private readonly companyHttpServiceInterface: CompanyHttpServiceInterface,
    @Inject('LockHttpServiceInterface')
    private readonly lockHttpServiceInterface: LockHttpServiceInterface,
  ) { }

  /**
   * 根据条件查找库存
   * @param condition InventorySearchModel
   */
  getAllInventoryByCondition(condition : PageableBase<InventorySearchModel>): Observable<any> {
    return this.companyHttpServiceInterface.getAllInventoryByCondition(condition);
  }

  /**
   * 根据条件查找分发记录 
   * 
   * @param condition PageableBase<DispenseRecordSearchModel>
   */
  getDispenseRecordByConditon(condition: PageableBase<DispenseRecordSearchModel>): Observable<any> {
    return this.lockHttpServiceInterface.getDispenseRecordByCondition(condition);
  }

  
  /**
   * 重新分发
   * @param dispenseRecord DispenseRecordModel
   */
  receive(dispenseRecord: DispenseRecordModel): Observable<any> {
    return this.lockHttpServiceInterface.recieve(dispenseRecord);
  }

  /**
   * 获取当前公司库存信息
   */
  getCurrentyUserInventory(): Observable<any> {
    return this.companyHttpServiceInterface.getCurrentyUserInventory();
  }

  /**
   * 采购电子封锁
   * @param count purchCount
   */
  purchLocks(count: number): Observable<any> {
    return this.lockHttpServiceInterface.purchLocks(count);
  }

}
