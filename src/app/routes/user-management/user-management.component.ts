import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { UserSearchModel } from 'src/app/common/model/user/user-search.model';
import { PageableBase } from 'src/app/common/model/pageable-base.model';
import { UserManagementService } from './user-management.service';
import { PageModeEnum } from 'src/app/common/enum/page-mode.enum';
import { AccountModel } from 'src/app/common/model/user/account.model';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
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
export class UserManagementComponent implements OnInit {
  pageNum = 0;
  pageSize = 10;
  total = 1;
  listOfData: Array<any>;
  loading = true;
  searchValue = '';

  // 右侧Sidebar标题内容
  pageMode: PageModeEnum;
  selectedUserDetail: AccountModel;
  viewSidebar = false;

  constructor(
    private userManagementService: UserManagementService
  ) { }

  ngOnInit() {
    this.searchData();
  }

  sort(sort: { key: string; value: string }): void {
    // this.sortKey = sort.key;
    // this.sortValue = sort.value;
    this.searchData();
  }

  /**
   * 根据条件查询所有user信息
   */
  searchData(reset: boolean = false): void {
    if (reset) {
      this.pageNum = 0;
    }
    this.loading = true;

    const userSearchModel = new UserSearchModel();
    userSearchModel.name = _.isEmpty(this.searchValue) ? null : this.searchValue;

    const pageableSearch = new PageableBase<UserSearchModel>();

    pageableSearch.pageNum = this.pageNum;
    pageableSearch.pageSize = this.pageSize;
    pageableSearch.condition = userSearchModel;

    this.userManagementService.queryUserByCondition(pageableSearch).subscribe(data => {
      this.loading = false;
      this.total = data.total;
      this.listOfData = data.list;
    });
  }

  reset(): void {
    this.searchValue = '';
    this.searchData();
  }

  createUserDetail() {
    this.selectedUserDetail = null;
    this.pageMode = PageModeEnum.CREATE;
    this.viewSidebar = true;
  }

  openDetail(data: any, isView = true): void {
    this.userManagementService.getFullAccountByAccountId(data.accountId).subscribe(result => {
      this.selectedUserDetail = result;
      this.viewSidebar = true;
      this.pageMode = PageModeEnum.EDIT;
    });
  }

  inactive(data: any): void{
    this.userManagementService.removeUserByAccountId(data.accountId).subscribe(result => {
      this.searchData();
    })
  }

  /**
   * 取消禁用
   */
  cancel(): void {

  }
  
  close(): void {
    this.viewSidebar = false;
  }

  onVisibleChange($event) {
    this.viewSidebar = false;
    this.selectedUserDetail = null;
    this.searchData();
  }
}
