import { Component, OnInit } from '@angular/core';
import { PageModeEnum } from 'src/app/common/enum/page-mode.enum';
import { CompanyModel } from 'src/app/common/model/company/company.model';
import { CompanyManagementService } from './company-management.service';
import { CompanySearchModel } from 'src/app/common/model/company/company-search.model';
import { PageableBase } from 'src/app/common/model/pageable-base.model';
import * as _ from 'lodash';
@Component({
  selector: 'app-company-management',
  templateUrl: './company-management.component.html',
  styles: [`
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
`]
})
export class CompanyManagementComponent implements OnInit {

  pageNum = 0;
  pageSize = 10;
  total = 1;
  listOfData: Array<any>;
  loading = true;
  searchValue = '';

  viewSidebar = false;
  roleList = [];
  // 右侧Sidebar标题内容
  pageMode: PageModeEnum;

  selectedCompanyDetail: CompanyModel;

  constructor(private companyManagementService: CompanyManagementService) {}

  sort(sort: { key: string; value: string }): void {
    // this.sortKey = sort.key;
    // this.sortValue = sort.value;
    this.searchData();
  }

  ngOnInit(): void {
    this.searchData();
  }

  /**
   * 根据条件查询所有staff信息
   */
  searchData(reset: boolean = false): void {
    if (reset) {
      this.pageNum = 0;
    }
    this.loading = true;

    const companySearchModel = new CompanySearchModel();
    companySearchModel.companyName = _.isEmpty(this.searchValue) ? null : this.searchValue;

    const pageableSearch = new PageableBase<CompanySearchModel>();

    pageableSearch.pageNum = this.pageNum;
    pageableSearch.pageSize = this.pageSize;
    pageableSearch.condition = companySearchModel;

    this.companyManagementService.getCompanyByCondition(pageableSearch).subscribe(data => {
      this.loading = false;
      this.total = data.total;
      this.listOfData = data.list;
    });
  }

  reset(): void {
    this.searchValue = '';
    this.searchData();
  }

  createCompanyDetail() {
    this.selectedCompanyDetail = null;
    this.pageMode = PageModeEnum.CREATE;
    this.viewSidebar = true;
  }

  openDetail(data: any, isView = true): void {
    this.selectedCompanyDetail = data;
    this.viewSidebar = true;
    this.pageMode = PageModeEnum.EDIT;
  }

  close(): void {
    this.viewSidebar = false;
  }

  onVisibleChange($event) {
    this.viewSidebar = false;
    this.selectedCompanyDetail = null;
    this.searchData();
  }

}
