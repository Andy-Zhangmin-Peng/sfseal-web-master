import { Component, OnInit } from '@angular/core';
import { PageModeEnum } from 'src/app/common/enum/page-mode.enum';
import { LockSearchModel } from 'src/app/common/model/company/lock-search.model';
import * as _ from 'lodash';
import { PageableBase } from 'src/app/common/model/pageable-base.model';
import { LockManagementService } from './lock-management.service';
import { UploadFile, NzMessageService } from 'ng-zorro-antd';
import { LockModel } from 'src/app/common/model/company/lock.model';
import { Data } from '@angular/router';
import { SettingsService } from '@delon/theme';

@Component({
  selector: 'app-lock-management',
  templateUrl: './lock-management.component.html',
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
    `
  ]
})
export class LockManagementComponent implements OnInit {
  pageNum = 0;
  pageSize = 10;
  total = 1;
  listOfData: Data[] = [];
  loading = true;
  searchValue = '';

  isSystemadmin = false;
  
  boxList = [];
  searchCompanyList: number[] = [];
  searchStatusList: number[] = [];

  uploading = false;
  fileList: UploadFile[] = [];

  // checkbox
  isAllDisplayDataChecked = false;
  isAllDisplayDataDisabled = false;
  isOperating = false;
  isDispenseOperating = false
  isIndeterminate = false;
  listOfDisplayData: Data[] = [];
  mapOfCheckedId: { [key: string]: boolean } = {};
  numberOfChecked = 0;

  // 右侧Sidebar标题内容
  pageMode: PageModeEnum;
  viewSidebar = false;
  selectedLockDetail: LockModel;

  // 批量导入所用参数
  isModalVisible = false;
  showCompany: boolean;
  importType : "stage";
  companyList = [];
  orginFilterCompany = [];
  statusTypeList = [];
  orginStatusTypeList = [];

  selectedCompany: any;

  isDispenseVisible = false;
  selectedDispenseCompany: any;

  data = {
    otherdata: 1,
    time: new Date()
  };

  constructor(
    private lockManagementService: LockManagementService,
    private message: NzMessageService,
    private settingsService: SettingsService,
  ) { }

  ngOnInit() {
    if (this.settingsService.user.roles[0].roleId === 1){
      this.isSystemadmin = true;
    }
    this.searchData();
    this.getAllCompanies();
    this.getAllLockStatus();
  }

  currentPageDataChange($event: Data[]): void {
    this.listOfDisplayData = $event;
    this.refreshStatus();
  }

  refreshStatus(): void {
    this.isAllDisplayDataDisabled = this.listOfDisplayData.every(item => item.statusCode !== 10001);
    this.isAllDisplayDataChecked = this.listOfDisplayData.every(item => this.mapOfCheckedId[item.rfid]);
    this.isIndeterminate = this.listOfDisplayData.some(item => this.mapOfCheckedId[item.rfid]) && !this.isAllDisplayDataChecked;
    this.numberOfChecked = this.listOfData.filter(item => this.mapOfCheckedId[item.rfid]).length;

  }

  importTypeChange(data:any): void {
    // tslint:disable-next-line: prefer-conditional-expression
    if (data === 'dispense'){
      this.showCompany = true;
    }else{
      this.showCompany = false;
    }
  }
  checkAll(value: boolean): void {
    this.listOfDisplayData.forEach(item => (this.mapOfCheckedId[item.rfid] = value));
    this.refreshStatus();
  }

  dispenseLock (): void {
    this.isDispenseVisible = true;
  }
  
  handleCancelDispense(): void{
    this.selectedDispenseCompany = null;
    this.isDispenseVisible = false;
  }

  /**
   * 批量删除电子封锁
   */
  deleteLocks(): void {
    this.isOperating = true;
    const selectedRfidList = [];
      
    this.listOfData.forEach(item => {
      if (this.mapOfCheckedId[item.rfid] === true){
        selectedRfidList.push(item.rfid);
      }
    });
    this.lockManagementService.removeLock(selectedRfidList).subscribe(result =>{
      this.message.info('成功删除'+ this.numberOfChecked + '个电子封锁');

      this.refreshStatus();
      this.isOperating = false;
      this.numberOfChecked = 0;
      this.searchData();
    },
    () => {
      this.message.error('电子封锁删除失败！');
    },)
  }

  cancel(): void {
  }

  /**
   * 分发电子封锁
   */
  dispenseLockOperator(): void {
    this.isDispenseOperating = true;
    setTimeout(() => {
      const selectedRfidList = [];
      
      this.listOfData.forEach(item => {
        if (this.mapOfCheckedId[item.rfid] === true){
          selectedRfidList.push(item.rfid);
        }
      });

      this.lockManagementService.dispenseLock(this.selectedDispenseCompany,selectedRfidList).subscribe( result =>{
        this.refreshStatus();
        this.isDispenseOperating = false;
        this.isDispenseVisible = false;
        this.selectedDispenseCompany = null;
        this.searchData();
        this.message.info("分发成功！");
      },() => {
        this.message.warning("分发失败！");
      });
    }, 1000);
  }

  sort(sort: { key: string; value: string }): void {
    // this.sortKey = sort.key;
    // this.sortValue = sort.value;
    this.searchData();
  }

  /**
   * 当filter发生变化时，执行查询
   */
  updateFilter(value: number[]): void {
    this.searchCompanyList = value;
    this.searchData(true);
  }

  /**
   * 当filter发生变化时，执行查询
   */
  updateStatusFilter(value: number[]): void {
    this.searchStatusList = value;
    this.searchData(true);
  }

  /**
   * 根据条件查询所有锁信息
   */
  searchData(reset: boolean = false): void {
    if (reset) {
      this.pageNum = 0;
    }
    this.loading = true;

    const lockSearchModel = new LockSearchModel();
    lockSearchModel.barCode = _.isEmpty(this.searchValue) ? null : this.searchValue;
    this.searchCompanyList.forEach(company => {
      lockSearchModel.companyIdList.push(company);
    });

    this.searchStatusList.forEach(status => {
      lockSearchModel.lockStatusIdList.push(status);
    });

    const pageableSearch = new PageableBase<LockSearchModel>();

    pageableSearch.pageNum = this.pageNum;
    pageableSearch.pageSize = this.pageSize;
    pageableSearch.condition = lockSearchModel;

    this.lockManagementService.getLocksByConditon(pageableSearch).subscribe(data => {
      this.loading = false;
      this.total = data.total;
      this.listOfData = data.list;
    });
  }

  importLock(): void {
    this.isModalVisible = true;
    this.uploading = false;
  }

  /**
   * 获取所有公司
   */
  getAllCompanies(): void {
    this.lockManagementService.getAllCompanies().subscribe(result => {
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
   * 获取所有状态类型
   */
  getAllLockStatus() {
    this.lockManagementService.getReferenceDataByCategory('LOCK_STATUS').subscribe(data => {
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

  handleCancelImport(): void {
    this.uploading = false;
    this.fileList = [];
    this.isModalVisible = false;
    this.showCompany = false;
    this.selectedDispenseCompany = null;
    this.importType = null;
  }

  beforeUpload = (file: UploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };

  /**
   * 批量导入电子封锁
   */
  handleUpload(): void {
    const formData = new FormData();
    this.fileList.forEach((file: any) => {
      formData.append('file', file);
    });
    this.uploading = true;
    if(this.selectedCompany !== null && this.selectedCompany !== undefined){
      formData.append('companyId', this.selectedCompany);
    }
    this.lockManagementService.importLocks(formData).subscribe(data => {
      this.uploading = false;
      this.fileList = [];
      this.isModalVisible = false;
      this.message.info("预计导入：" +data.importedRecordCount + "个电子封锁，实际导入：" 
                      + data.insertedRecordCount + "个电子封锁，既存：" 
                      + data.existedRecordCount + "个电子封锁，表中重复：" 
                      + data.duplicatedRecordCount + "个电子封锁" )
      this.searchData();
    })
  }

  reset(): void {
    this.searchValue = '';
    this.searchData();
  }

  openDetail(data: any, isView = true): void {
    this.selectedLockDetail = data;
    this.viewSidebar = true;
    this.pageMode = PageModeEnum.EDIT;
  }

  close(): void {
    this.viewSidebar = false;
  }
  
  onVisibleChange($event) {
    this.viewSidebar = false;
    this.selectedLockDetail = null;
    this.searchData();
  }
}