import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { InventoryManagementService } from './inventory-management.service';
import { InventorySearchModel } from 'src/app/common/model/company/inventory-search.model';
import * as _ from 'lodash';
import { PageableBase } from 'src/app/common/model/pageable-base.model';
import { SettingsService, User } from '@delon/theme';
import { DispenseRecordSearchModel } from 'src/app/common/model/company/dispense-record-search.model';
import { InventoryModel } from 'src/app/common/model/company/inventory.model';
@Component({
  selector: 'app-inventory-management',
  templateUrl: './inventory-management.component.html',
  styles: [    `
    .search-box {
      padding: 8px;
    }

    .search-box input {
      width: 188px;
      margin-bottom: 8px;
      display: block;
    }
    .search-box nz-input-number {
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
`]
})
export class InventoryManagementComponent implements OnInit {
  pageNum = 0;
  pageSize = 10;
  total = 1;
  listOfData: Array<any>;
  loading = true;
  searchValue = '';

  user: User;
  isSystemadmin = false;
  companyId: number;
  listOfDispenseRecord: Array<any>;

  isVisible = false;
  purchCount = 0;

  currentUserInverntory : InventoryModel;
  // 未使用的数量
  unusedCount: number;
  // 最近购买的数量
  latestPurchaseCount: number;
  // 已使用的数量
  usedCount: number;
  // 采购总量
  purchaseCount:number;
  // 查询未使用的数量
  searchUnusedCount: number;
  constructor(
    private inventoryManagementService: InventoryManagementService,
    private message: NzMessageService,
    private settingsService: SettingsService,
  ) { }

  ngOnInit() {

    if (this.settingsService.user.roles[0].roleId === 1){
      this.isSystemadmin = true;
      this.searchData();
    }else {
      this.companyId = this.settingsService.user.company.companyId;
      this.searchDispenseData();
      this.getCurrentUserInwentory();
    }
  }

  /**
   * 根据条件查询所有库存记录
   */
  searchData(reset: boolean = false): void {
    if (reset) {
      this.pageNum = 0;
    }
    this.loading = true;

    const inventorySearchModel = new InventorySearchModel();
    inventorySearchModel.companyName = _.isEmpty(this.searchValue) ? null : this.searchValue;
    inventorySearchModel.unusedCount = this.searchUnusedCount === 0 ? null : this.searchUnusedCount;

    const pageableSearch = new PageableBase<InventorySearchModel>();

    pageableSearch.pageNum = this.pageNum;
    pageableSearch.pageSize = this.pageSize;
    pageableSearch.condition = inventorySearchModel;

    this.inventoryManagementService.getAllInventoryByCondition(pageableSearch).subscribe(data => {
      this.loading = false;
      this.total = data.total;
      this.listOfData = data.list;
    });
  }


  sort(sort: { key: string; value: string }): void {
    // this.sortKey = sort.key;
    // this.sortValue = sort.value;
    this.searchData();
  }

  getCurrentUserInwentory(): void {
    this.inventoryManagementService.getCurrentyUserInventory().subscribe(result => {
      this.currentUserInverntory = result;
      this.unusedCount = result.unusedCount;
      this.latestPurchaseCount = result.latestPurchaseCount;
      this.usedCount = result.usedCount;
      this.purchaseCount = result.purchaseCount;

    })
  }
  /**
   * 根据条件查询所有分发记录
   */
  searchDispenseData(reset: boolean = false): void {
    if (reset) {
      this.pageNum = 0;
    }
    this.loading = true;

    const dispenseSearchModel = new DispenseRecordSearchModel();
    dispenseSearchModel.companyName = _.isEmpty(this.searchValue) ? null : this.searchValue;
    dispenseSearchModel.companyId = _.isEmpty(this.companyId) ? null : this.companyId;
    dispenseSearchModel.isActive = true;

    const pageableSearch = new PageableBase<DispenseRecordSearchModel>();

    pageableSearch.pageNum = this.pageNum;
    pageableSearch.pageSize = this.pageSize;
    pageableSearch.condition = dispenseSearchModel;

    this.inventoryManagementService.getDispenseRecordByConditon(pageableSearch).subscribe(data => {
      this.loading = false;
      this.total = data.total;
      this.listOfDispenseRecord = data.list;
    });
  }

  receive(data: any): void{
    this.inventoryManagementService.receive(data).subscribe(result => {
      this.searchDispenseData();
      this.getCurrentUserInwentory();
      this.message.info("接收成功！");
    },() =>{
      this.message.warning("接收失败，请联系管理员！")
    })
  }

  purchLocks(): void {
    this.isVisible = true;
  }

  operateData(): void {
    this.inventoryManagementService.purchLocks(this.purchCount).subscribe(result => {
      this.isVisible = false;
      this.searchDispenseData();
      this.getCurrentUserInwentory();
      if (result === 0){
        this.message.warning("库存不足，请联系厂家！");
      }else {
        this.message.info("成功采购"+ result + "个电子封锁，请去接收！");
      }
      
    })
  }

  handleCancelDispense(): void{
    this.isVisible = false;
  }

  reset(): void{
    this.searchValue = '';
    this.searchData();
  }

  resetUnusedCount(): void{
    this.searchUnusedCount = null;
    this.searchData();
  }
}
