import { Component, OnInit } from '@angular/core';
import { ExceptionalSituationManagementService } from './exceptional-situation-management.service';
import { ExceptionalSituationSearchModel } from 'src/app/common/model/company/exceptional-situation-search.model';
import { PageableBase } from 'src/app/common/model/pageable-base.model';
import * as _ from 'lodash';
import { ExceptionalSituationModel } from 'src/app/common/model/company/exceptional-situation.model';
import { PageModeEnum } from 'src/app/common/enum/page-mode.enum';

@Component({
  selector: 'app-exceptional-situation-management',
  templateUrl: './exceptional-situation-management.component.html',
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
export class ExceptionalSituationManagementComponent implements OnInit {
  pageNum = 0;
  pageSize = 10;
  total = 1;
  listOfData: Array<any>;
  loading = true;
  searchValue = '';

  // 右侧Sidebar标题内容
  pageMode: PageModeEnum;
  viewSidebar = false;
  selectedExceptionalSituationDetail: ExceptionalSituationModel;

  constructor(
    private exceptionalSituationManagementService: ExceptionalSituationManagementService, 
  ) { }

  ngOnInit() {
    this.searchData();
  }

  searchData(reset: boolean = false): void {
    if (reset) {
      this.pageNum = 0;
    }
    this.loading = true;

    const exceptionSearchModel = new ExceptionalSituationSearchModel();
    exceptionSearchModel.barCode = _.isEmpty(this.searchValue) ? null : this.searchValue;
    // this.searchCompanyList.forEach(company => {
    //   staffSearchModel.companyIdList.push(company);
    // });

    const pageableSearch = new PageableBase<ExceptionalSituationSearchModel>();

    pageableSearch.pageNum = this.pageNum;
    pageableSearch.pageSize = this.pageSize;
    pageableSearch.condition = exceptionSearchModel;

    this.exceptionalSituationManagementService.getExceptionByComdition(pageableSearch).subscribe(data => {
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
    this.selectedExceptionalSituationDetail = data;
      this.viewSidebar = true;
      this.pageMode = PageModeEnum.VIEW;
  }
}
