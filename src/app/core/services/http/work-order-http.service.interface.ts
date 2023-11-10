import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageableBase } from 'src/app/common/model/pageable-base.model';
import { WorkOrderSearchModel } from 'src/app/common/model/company/work-order-search.model';
import { WorkOrderModel } from 'src/app/common/model/company/work-order.model';

export interface WorkOrderHttpServiceInterface {
  
  /**
   * 根据条件查找工单信息
   * 
   * @param condition the PageableBase<WorkOrderSearchModel>
   */
  getWorkOrdersByCondition(condition: PageableBase<WorkOrderSearchModel>): Observable<any>;

  /**
   * 创建运输载体
   */
  createTransport(transportId: string): Observable<any>;

  /**
   * 创建工单
   * 
   * @param workOrder WorkOrderModel
   */
  createWorkOrder(workOrder: WorkOrderModel): Observable<any>;

  /**
   * 更新工单
   * 
   * @param workOrder WorkOrderModel
   */
  updateWorkOrder(workOrder: WorkOrderModel): Observable<any>;

  /**
   * 批量删除
   * 
   * @param workOrderIdList the list of work order id
   */
  removeWorkOrders(workOrderIdList: any): Observable<any>;

  /**
   * 上传工单附件
   * 
   * @param formData FormData
   */
  uploadWorkOrderAttachment(formData : FormData): Observable<any>;

}
