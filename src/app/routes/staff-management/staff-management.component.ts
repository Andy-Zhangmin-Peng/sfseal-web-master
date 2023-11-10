import { Component, OnInit } from '@angular/core';
import { StaffManagementService } from './staff-management.service';
import { StaffSearchModel } from 'src/app/common/model/staff/staff-search.model';
import { PageableBase } from 'src/app/common/model/pageable-base.model';
import * as _ from 'lodash';
import { AccountModel } from 'src/app/common/model/user/account.model';
import { PageModeEnum } from 'src/app/common/enum/page-mode.enum';

@Component({
  selector: 'app-staff-management',
  templateUrl: './staff-management.component.html',
  styleUrls: ['./staff-management.component.less'],
})
export class StaffManagementComponent implements OnInit {
  pageNum = 0;
  pageSize = 10;
  total = 1;
  listOfData: Array<any>;
  loading = true;
  searchValue = '';
  companyList = [];
  orginFilterCompany = [];
  searchCompanyList: number[] = [];

  viewSidebar = false;
  roleList = [];
  // 右侧Sidebar标题内容
  pageMode: PageModeEnum;

  selectedstaffDetail: AccountModel;

  constructor(private staffManagementService: StaffManagementService) {}

  sort(sort: { key: string; value: string }): void {
    // this.sortKey = sort.key;
    // this.sortValue = sort.value;
    this.searchData();
  }

  ngOnInit(): void {
    this.searchData();
    this.getAllCompanies();

  }

  /**
   * 根据条件查询所有staff信息
   */
  searchData(reset: boolean = false): void {
    if (reset) {
      this.pageNum = 0;
    }
    this.loading = true;

    const staffSearchModel = new StaffSearchModel();
    staffSearchModel.name = _.isEmpty(this.searchValue) ? null : this.searchValue;
    this.searchCompanyList.forEach(company => {
      staffSearchModel.companyIdList.push(company);
    });

    const pageableSearch = new PageableBase<StaffSearchModel>();

    pageableSearch.pageNum = this.pageNum;
    pageableSearch.pageSize = this.pageSize;
    pageableSearch.condition = staffSearchModel;

    this.staffManagementService.queryStaffByCondition(pageableSearch).subscribe(data => {
      this.loading = false;
      this.total = data.total;
      this.listOfData = data.list;
    });
  }

  /**
   * 获取所有公司
   */
  getAllCompanies(): void {
    this.staffManagementService.getAllCompanies().subscribe(result => {
      result.forEach(item => {
        this.orginFilterCompany.push({
          text: item.companyName,
          value: item.companyId,
        });
      });
      this.companyList = this.orginFilterCompany;
    });
  }
  /**
   * 当filter发生变化时，执行查询
   */
  updateFilter(value: number[]): void {
    this.searchCompanyList = value;
    this.searchData(true);
  }

  reset(): void {
    this.searchValue = '';
    this.searchData();
  }

  createStaffDetail() {
    this.selectedstaffDetail = null;
    this.pageMode = PageModeEnum.CREATE;
    this.viewSidebar = true;
  }

  openDetail(data: any, isView = true): void {
    this.staffManagementService.getFullAccountByAccountId(data.accountId).subscribe(result => {
      this.selectedstaffDetail = result;
      this.viewSidebar = true;
      this.pageMode = PageModeEnum.EDIT;
    });
  }

  inactive(data: any): void{
    this.staffManagementService.removeStaffByAccountId(data.accountId).subscribe(result => {
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
    this.selectedstaffDetail = null;
    this.searchData();
  }
}
