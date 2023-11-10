import { Injectable, Inject } from '@angular/core';
import { WorkOrderHttpServiceInterface } from '@core/services/http/work-order-http.service.interface';
import { WorkOrderSearchModel } from 'src/app/common/model/company/work-order-search.model';
import { PageableBase } from 'src/app/common/model/pageable-base.model';
import { Observable } from 'rxjs';
import { LockHttpServiceInterface } from '@core/services/http/lock-http.service.interface';
import { LockSearchModel } from 'src/app/common/model/company/lock-search.model';
import { WorkOrderModel } from 'src/app/common/model/company/work-order.model';
import { ReferenceHttpServiceInterface } from '@core/services/http/reference-http.service.interface';

@Injectable({
  providedIn: 'root'
})
export class WorkOrderManagementService {

  constructor(
    @Inject('WorkOrderHttpServiceInterface')
    private readonly workOrderHttpServiceInterface: WorkOrderHttpServiceInterface,
    @Inject('LockHttpServiceInterface')
    private readonly lockHttpServiceInterface: LockHttpServiceInterface,
    @Inject('ReferenceHttpServiceInterface')
    private readonly referenceHttpServiceInterface: ReferenceHttpServiceInterface,
  ) { }

  
  /**
   * 根据条件查找工单
   * 
   * @param condition PageableBase<WorkOrderSearchModel>
   */
  getWorkOrdersByConditon(condition: PageableBase<WorkOrderSearchModel>): Observable<any> {
    return this.workOrderHttpServiceInterface.getWorkOrdersByCondition(condition);
  }

  /**
   * 根据条件查找锁 
   * 
   * @param condition PageableBase<LockSearchModel>
   */
  getLocksByConditon(condition: PageableBase<LockSearchModel>): Observable<any> {
    return this.lockHttpServiceInterface.getLocksByCondition(condition);
  }

  /**
   * 根据条件查找未被使用的锁
   * 
   * @param barcode barcode
   */
  getLocksForWorkOrder(searchModel: LockSearchModel): Observable<any> {
    return this.lockHttpServiceInterface.getLocksForWorkOrder(searchModel);
  }

  /**
   * 创建运输载体
   */
  createTransport(transportId: string): Observable<any> {
    return this.workOrderHttpServiceInterface.createTransport(transportId);
  }

  
  /**
   * 创建工单
   * 
   * @param workOrder WorkOrderModel
   */
  createWorkOrder(workOrder: WorkOrderModel): Observable<any>{
    return this.workOrderHttpServiceInterface.createWorkOrder(workOrder);
  }

  /**
   * 更新工单
   * 
   * @param workOrder WorkOrderModel
   */
  updateWorkOrder(workOrder: WorkOrderModel): Observable<any>{
    return this.workOrderHttpServiceInterface.updateWorkOrder(workOrder);
  }

  /**
   * 根据类别查找所有工单状态
   * @param category string
   */
  getReferenceDataByCategory(category: string): Observable<any> {
    return this.referenceHttpServiceInterface.getReferenceDataByCategory(category);
  }

  removeWorkorder(workOrderIdList: any): Observable<any>{ 
    return this.workOrderHttpServiceInterface.removeWorkOrders(workOrderIdList);
  }

  uploadWorkOrderAttachment(formData: FormData): Observable<any>{
    return this.workOrderHttpServiceInterface.uploadWorkOrderAttachment(formData);
  }

  getLockSealInfoByBarCode(barcode: string): Observable<any>{
    return this.lockHttpServiceInterface.getLockSealInfoByBarCode(barcode);
  }
}
