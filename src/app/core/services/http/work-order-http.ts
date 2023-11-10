import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UrlConstant } from 'src/app/common/constant/url.constant';
import { PageableBase } from 'src/app/common/model/pageable-base.model';
import { WorkOrderHttpServiceInterface } from './work-order-http.service.interface';
import { WorkOrderSearchModel } from 'src/app/common/model/company/work-order-search.model';
import { WorkOrderModel } from 'src/app/common/model/company/work-order.model';

@Injectable()
export class WorkOrderHttpService implements WorkOrderHttpServiceInterface {

  constructor(private readonly _httpClient: HttpClient) {
  }

  /**
   * 根据条件查找工单信息
   * 
   * @param condition PageableBase<LockSearchModel>
   */
  getWorkOrdersByCondition(condition: PageableBase<WorkOrderSearchModel>): Observable<any> {
    return this._httpClient.post(`${UrlConstant.WORKORDER}/${UrlConstant.QUERY}`,condition);
  }
  
  /**
   * 创建运输载体
   */
  createTransport(transportId: string): Observable<any> {
    return this._httpClient.post(`${UrlConstant.WORKORDER}/${UrlConstant.TRANSPORT}`,transportId);
  }

  /**
   * 创建工单
   * 
   * @param workOrder WorkOrderModel
   */
  createWorkOrder(workOrder: WorkOrderModel): Observable<any>{
    return this._httpClient.post(`${UrlConstant.WORKORDER}`,workOrder);
  }

  /**
   * 更新工单
   * 
   * @param workOrder WorkOrderModel
   */
  updateWorkOrder(workOrder: WorkOrderModel): Observable<any>{
    return this._httpClient.put(`${UrlConstant.WORKORDER}`,workOrder);
  }
  
  /**
   * 删除工单
   * @param workOrderIdList the list of work order id
   */
  removeWorkOrders(workOrderIdList: any): Observable<any>{
    return this._httpClient.post(`${UrlConstant.WORKORDER}/${UrlConstant.REMOVE}`,workOrderIdList);
  }

  /**
   * 上传工单附件
   * 
   * @param formData FormData
   */
  uploadWorkOrderAttachment(formData : FormData): Observable<any> {
    return this._httpClient.post(`${UrlConstant.WORKORDER}/${UrlConstant.ATTACHMENT}`,formData);
  }
}
