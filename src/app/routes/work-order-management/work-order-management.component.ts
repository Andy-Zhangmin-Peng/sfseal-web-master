import { Component, OnInit, EventEmitter } from '@angular/core';
import { Data } from '@angular/router';
import { WorkOrderSearchModel } from 'src/app/common/model/company/work-order-search.model';
import * as _ from 'lodash';
import { PageableBase } from 'src/app/common/model/pageable-base.model';
import { WorkOrderManagementService } from './work-order-management.service';
import { PageModeEnum } from 'src/app/common/enum/page-mode.enum';
import { WorkOrderModel } from 'src/app/common/model/company/work-order.model';
import { LockSearchModel } from 'src/app/common/model/company/lock-search.model';
import { SettingsService } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';
@Component({
  selector: 'app-work-order-management',
  templateUrl: './work-order-management.component.html',
  styles: [
      `
      nz-select {
        margin-right: 8px;
        width: 200px;
      }
      .search-box {
        padding: 8px;
      }

      .search-box input {
        width: 188px;
        margin-bottom: 8px;
        display: block;
      }

      .search-box button {
        width: 90px;
      }

      .search-button {
        margin-right: 8px;
      }

      nz-date-picker {
        margin: 0 8px 12px 0;
      }
      .example-input .ant-input {
        width: 200px;
        margin: 0 8px 8px 0;
      }
    `
  ]
})
export class WorkOrderManagementComponent implements OnInit {
  pageNum = 0;
  pageSize = 10;
  total = 1;
  listOfData: Data[] = [];
  loading = true;
  searchValue = '';
  searchCarrieraValue = '';

  searchStatusList: number[] = [];
  statusTypeList = [];
  orginStatusTypeList = [];
  // checkbox
  isAllDisplayDataChecked = false;
  isAllDisplayDataDisabled = false;
  isOperating = false;
  isIndeterminate = false;
  listOfDisplayData: Data[] = [];
  mapOfCheckedId: { [key: string]: boolean } = {};
  numberOfChecked = 0;

  // 右侧Sidebar标题内容
  viewSidebar = false;
  pageMode: PageModeEnum;
  selectedWorkOrderDetail: WorkOrderModel;
  unusedLockList: string[] = [];
  visibleChange = new EventEmitter();

  startDateValue: any;
  endDateValue: any;
  startAddress: '';
  endAddress:'';
  
  constructor(
    private workOrderManagementService:  WorkOrderManagementService,
    private settingsService: SettingsService,
    private message: NzMessageService,
  ) { }

  ngOnInit() {
    this.searchData();
    this.getAllUnusedLocks();
    this.getAllWorkOrderStatus();
  }

  onStartChange(date: Date): void {
    this.searchData();
  }

  onEndChange(date: Date): void {
    this.searchData();
  }

  /**
   * 根据条件查询所有锁信息
   */
  searchData(reset: boolean = false): void {
    if (reset) {
      this.pageNum = 0;
    }
    this.loading = true;

    const workOrderSearchModel = new WorkOrderSearchModel();

    const pageableSearch = new PageableBase<WorkOrderSearchModel>();

    workOrderSearchModel.owner = _.isEmpty(this.searchValue) ? null : this.searchValue;
    workOrderSearchModel.carriera = _.isEmpty(this.searchCarrieraValue) ? null : this.searchCarrieraValue;
    workOrderSearchModel.startTime =  this.startDateValue;
    workOrderSearchModel.endTime = this.endDateValue;
    workOrderSearchModel.startAddress = _.isEmpty(this.startAddress) ? null : this.startAddress; 
    workOrderSearchModel.endAddress = _.isEmpty(this.endAddress) ? null : this.endAddress; 

    this.searchStatusList.forEach(status => {
      workOrderSearchModel.workOrderStatusIdList.push(status);
    });

    pageableSearch.pageNum = this.pageNum;
    pageableSearch.pageSize = this.pageSize;
    pageableSearch.condition = workOrderSearchModel;

    this.workOrderManagementService.getWorkOrdersByConditon(pageableSearch).subscribe(data => {
      this.loading = false;
      this.total = data.total;
      this.listOfData = data.list;
    });
  }

  /**
   * 获取所有状态类型
   */
  getAllWorkOrderStatus() {
    this.workOrderManagementService.getReferenceDataByCategory('WORK_ORDER_STATUS').subscribe(data => {
      data.forEach(item => {
        this.orginStatusTypeList.push({
          text: item.displayKey,
          value: item.id,
          byDefault: false,
        });
      });
      this.statusTypeList = this.orginStatusTypeList;
    });
  }

  sort(sort: { key: string; value: string }): void {
    // this.sortKey = sort.key;
    // this.sortValue = sort.value;
    this.searchData();
  }

  /**
   * 当filter发生变化时，执行查询
   */
  updateStatusFilter(value: number[]): void {
    this.searchStatusList = value;
    this.searchData(true);
  }

  currentPageDataChange($event: Data[]): void {
    this.listOfDisplayData = $event;
    this.refreshStatus();
  }

  refreshStatus(): void {
    this.isAllDisplayDataDisabled = this.listOfDisplayData.every(item => item.statusCode !== 20001);
    this.isAllDisplayDataChecked = this.listOfDisplayData.every(item => this.mapOfCheckedId[item.workOrderId]);
    this.isIndeterminate = this.listOfDisplayData.some(item => this.mapOfCheckedId[item.workOrderId]) && !this.isAllDisplayDataChecked;
    this.numberOfChecked = this.listOfData.filter(item => this.mapOfCheckedId[item.workOrderId]).length;

  }

  checkAll(value: boolean): void {
    this.listOfDisplayData.forEach(item => (this.mapOfCheckedId[item.workOrderId] = value));
    this.refreshStatus();
  }

  reset(): void {
    this.searchValue = '';
    this.searchData();
  }

  resetSearchCarrieraValue(): void {
    this.searchCarrieraValue = '';
    this.searchData();
  }

  editDetail(data: any, isView = true): void {
    this.selectedWorkOrderDetail = data;
    this.viewSidebar = true;
    this.pageMode = PageModeEnum.EDIT;
  }

  viewDetail(data: any, isView = true): void {
    this.selectedWorkOrderDetail = data;
    this.viewSidebar = true;
    this.pageMode = PageModeEnum.VIEW;
  }

  createWorkOrderDetail() {
    this.selectedWorkOrderDetail = null;
    this.pageMode = PageModeEnum.CREATE;
    this.viewSidebar = true;
  }

  getAllUnusedLocks() : void {
    const searchModel = new LockSearchModel();
    this.unusedLockList = [];
    this.workOrderManagementService.getLocksForWorkOrder(searchModel).subscribe(data => {
      data.forEach(element => {
        this.unusedLockList.push(element.barCode);
      });
    });
  }

  onVisibleChange($event) {
    this.selectedWorkOrderDetail = null;
    this.viewSidebar = false;
    this.getAllUnusedLocks();
    this.searchData();
  }

  deleteWorkOrders(): void{
    this.isOperating = true;
    const selectedWorkorderIdList = [];
      
    this.listOfData.forEach(item => {
      if (this.mapOfCheckedId[item.workOrderId] === true){
        selectedWorkorderIdList.push(item.workOrderId);
      }
    });
    this.workOrderManagementService.removeWorkorder(selectedWorkorderIdList).subscribe(result =>{
      this.message.info('成功删除'+ this.numberOfChecked + '个工单');

      this.refreshStatus();
      this.isOperating = false;
      this.numberOfChecked = 0;
      this.searchData();
    },
    () => {
      this.message.error('工单删除失败！');
    },)
  }

  cancel(): void {
  }
}
