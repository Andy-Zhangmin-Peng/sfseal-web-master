import { Component, OnInit } from '@angular/core';
import { PageModeEnum } from 'src/app/common/enum/page-mode.enum';
import { DispenseManagementService } from './dispense-management.service';
import { DispenseRecordSearchModel } from 'src/app/common/model/company/dispense-record-search.model';
import * as _ from 'lodash';
import { PageableBase } from 'src/app/common/model/pageable-base.model';
import { DispenseRecordModel } from 'src/app/common/model/company/dispense-record.model';
import { LockManagementService } from '../lock-management/lock-management.service';
import { NzMessageService } from 'ng-zorro-antd';
@Component({
  selector: 'app-dispense-management',
  templateUrl: './dispense-management.component.html',
  styles: [
    `
      nz-select {
        margin-right: 8px;
        width: 180px;
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
    `
  ]
})
export class DispenseManagementComponent implements OnInit {
  pageNum = 0;
  pageSize = 10;
  total = 1;
  listOfData: Array<any>;
  loading = true;
  searchValue = '';

  // 右侧Sidebar标题内容
  pageMode: PageModeEnum;
  viewSidebar = false;
  selectedDispenseRecordDetail : DispenseRecordModel;

  // 重新分发modal
  orginFilterCompany = [];
  companyList = [];
  selectedDispenseCompany: any;
  isDispenseVisible = false;

  constructor(
    private dispenseManagementService: DispenseManagementService,
    private message: NzMessageService,
  ) { }

  ngOnInit() {
    this.searchData();
    this.getAllCompanies();
  }

  /**
   * 根据条件查询所有分发记录
   */
  searchData(reset: boolean = false): void {
    if (reset) {
      this.pageNum = 0;
    }
    this.loading = true;

    const dispenseSearchModel = new DispenseRecordSearchModel();
    dispenseSearchModel.companyName = _.isEmpty(this.searchValue) ? null : this.searchValue;

    const pageableSearch = new PageableBase<DispenseRecordSearchModel>();

    pageableSearch.pageNum = this.pageNum;
    pageableSearch.pageSize = this.pageSize;
    pageableSearch.condition = dispenseSearchModel;

    this.dispenseManagementService.getDispenseRecordByConditon(pageableSearch).subscribe(data => {
      this.loading = false;
      this.total = data.total;
      this.listOfData = data.list;
    });
  }

  openDetail(data: any, isView = true): void {
    this.selectedDispenseRecordDetail = data;
    this.viewSidebar = true;
    this.pageMode = PageModeEnum.VIEW;
  }

  redispense(data: any, isView = true): void {
    this.isDispenseVisible = true;
    this.selectedDispenseRecordDetail = data;
  }

  handleCancelDispense(): void{
    this.isDispenseVisible = false;
  }

  operateData() : void{
    this.selectedDispenseRecordDetail.companyId = this.selectedDispenseCompany;
    this.dispenseManagementService.redispense(this.selectedDispenseRecordDetail).subscribe(result => {
      this.isDispenseVisible = false;
      this.message.info('重新分发成功');
      this.searchData();
    },
    () =>{
      this.message.warning('重新分发失败');
    });
  }

  reset(): void {
    this.searchValue = '';
    this.searchData();
  }
  
  sort(sort: { key: string; value: string }): void {
    // this.sortKey = sort.key;
    // this.sortValue = sort.value;
    this.searchData();
  }

  /**
   * 获取所有公司
   */
  getAllCompanies(): void {
    this.dispenseManagementService.getAllCompanies().subscribe(result => {
      result.forEach(item => {
        this.orginFilterCompany.push({
          text: item.companyName,
          value: item.companyId,
        });
      });
      this.companyList = this.orginFilterCompany;
    });
  }
  
  onVisibleChange($event) {
    this.viewSidebar = false;
    this.selectedDispenseRecordDetail = null;
    this.searchData();
  }
}
