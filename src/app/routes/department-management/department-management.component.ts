import { Component, OnInit } from '@angular/core';
import { DepartmentSearchModel } from 'src/app/common/model/company/department-search.model';
import * as _ from 'lodash';
import { PageableBase } from 'src/app/common/model/pageable-base.model';
import { DepartmentManagementService } from './department-management.service';
import { PageModeEnum } from 'src/app/common/enum/page-mode.enum';
import { DepartmentModel } from 'src/app/common/model/company/department.model';
import { SettingsService } from '@delon/theme';

@Component({
  selector: 'app-department-management',
  templateUrl: './department-management.component.html',
  styles: [
    `
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
export class DepartmentManagementComponent implements OnInit {

  pageNum = 0;
  pageSize = 10;
  total = 1;
  listOfData: Array<any>;
  loading = true;
  searchValue = '';
  viewSidebar = false;
  // 右侧Sidebar标题内容
  pageMode: PageModeEnum;

  selectedDepartmentDetail: DepartmentModel;

  constructor(private departmentManagementService: DepartmentManagementService,    private settingsService: SettingsService,) { }

  ngOnInit() {
    this.searchData();
  }

  /**
   * 根据条件查询所有部门信息
   */
  searchData(reset: boolean = false): void {
    if (reset) {
      this.pageNum = 0;
    }
    this.loading = true;

    const departmentSearchModel = new DepartmentSearchModel();
    departmentSearchModel.departmentName = _.isEmpty(this.searchValue) ? null : this.searchValue;
  
    const pageableSearch = new PageableBase<DepartmentSearchModel>();

    pageableSearch.pageNum = this.pageNum;
    pageableSearch.pageSize = this.pageSize;
    pageableSearch.condition = departmentSearchModel;

    this.departmentManagementService.getDepartmentsByCondition(pageableSearch).subscribe(data => {
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
  
  reset(): void {
    this.searchValue = '';
    this.searchData();
  }

  openDetail(data: any, isView = true): void {
    this.selectedDepartmentDetail = data;
      this.viewSidebar = true;
      this.pageMode = PageModeEnum.EDIT;
  }
  
  createDepartment(){
    this.selectedDepartmentDetail = null;
    this.pageMode = PageModeEnum.CREATE;
    this.viewSidebar = true;
  }

  onVisibleChange($event) {
    this.viewSidebar = false;
    this.selectedDepartmentDetail = null;
    this.searchData();
  }
}
