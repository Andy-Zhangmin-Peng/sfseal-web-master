import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { ImportRecordSearchModel } from 'src/app/common/model/company/import-record-search.model';
import { PageableBase } from 'src/app/common/model/pageable-base.model';
import { ImportRecordManagementService } from './import-record-management.service';
import { PageModeEnum } from 'src/app/common/enum/page-mode.enum';
import { ImportRecordModel } from 'src/app/common/model/company/import-record.model';

@Component({
  selector: 'app-import-record-management',
  templateUrl: './import-record-management.component.html',
  styles: []
})
export class ImportRecordManagementComponent implements OnInit {
  pageNum = 0;
  pageSize = 10;
  total = 1;
  listOfData: Data[] = [];
  loading = true;
  searchValue = '';
  
  // 右侧Sidebar标题内容
  pageMode: PageModeEnum;
  viewSidebar = false;
  selectedImportRecordDetail : ImportRecordModel;
  rfidList:[];

  constructor(
    private importRecordManagementService: ImportRecordManagementService,
  ) { }

  ngOnInit() {
    this.searchData();
  }

  searchData(reset: boolean = false): void {
    if (reset) {
      this.pageNum = 0;
    }
    this.loading = true;

    const importRecordSearchModel = new ImportRecordSearchModel();
    // importRecordSearchModel.barCode = _.isEmpty(this.searchValue) ? null : this.searchValue;

    const pageableSearch = new PageableBase<ImportRecordSearchModel>();

    pageableSearch.pageNum = this.pageNum;
    pageableSearch.pageSize = this.pageSize;
    pageableSearch.condition = importRecordSearchModel;

    this.importRecordManagementService.getDispenseRecordByConditon(pageableSearch).subscribe(data => {
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

  openDetail(data: any, isView = true): void {
    this.importRecordManagementService.getRfidsByImportId(data.importId).subscribe(result => {
      this.selectedImportRecordDetail = data;
      this.rfidList = result;
      this.viewSidebar = true;
      this.pageMode = PageModeEnum.VIEW;
    })

  }

  onVisibleChange($event) {
    this.selectedImportRecordDetail = null;
    this.viewSidebar = false;
    this.searchData();
  }
}
