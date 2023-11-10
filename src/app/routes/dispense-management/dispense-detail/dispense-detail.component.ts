import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { PageModeEnum } from 'src/app/common/enum/page-mode.enum';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DispenseRecordModel } from 'src/app/common/model/company/dispense-record.model';
import * as _ from 'lodash';
import * as moment from 'moment';
import { DispenseManagementService } from '../dispense-management.service';
import { NzMessageService } from 'ng-zorro-antd';
@Component({
  selector: 'app-dispense-detail',
  templateUrl: './dispense-detail.component.html',
  styles: [`
  .demo-infinite-container {
    height: 300px;
    border: 1px solid #e8e8e8;
    border-radius: 4px;
  }

  nz-list {
    padding: 24px;
  }
`],
changeDetection: ChangeDetectionStrategy.OnPush
})
export class DispenseDetailComponent implements OnInit {
  @Input() dispenseRecordDetail: DispenseRecordModel;
  @Input() pageMode: PageModeEnum;
  @Output() readonly visibleChange = new EventEmitter();
  pageModeEnum = PageModeEnum;

  dispenseRecordForm : FormGroup;
  rfidList:[];
  canBeRollBack = true;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private dispenseManagementService: DispenseManagementService,
    private message: NzMessageService,
  ) { }

  ngOnInit() {
    this.dispenseRecordForm = this.createSaffForm();
    this.getAllRfidByDispenseRecordId();
    if (this.dispenseRecordDetail.accpeted){
      this.canBeRollBack = false;
    }
  }

  createSaffForm(): FormGroup {
    const formGroup = this._formBuilder.group({
      dispenseRecordId:[_.get(this.dispenseRecordDetail, 'dispenseRecordId'), Validators.required,],
      companyName: [_.get(this.dispenseRecordDetail, 'companyName'), Validators.required,],
      dispenseDate: [moment(_.get(this.dispenseRecordDetail, 'createDate')).format('YYYY-MM-DD'),],
      dispenseUser: [_.get(this.dispenseRecordDetail, 'lastUpdateUser'),],
      count: [_.get(this.dispenseRecordDetail, 'dispenseCount'), Validators.required],
    });
    return formGroup;
  }

  getAllRfidByDispenseRecordId() :void {
    this.dispenseManagementService.getAllRfidByDispenseRecordId(this.dispenseRecordDetail.dispenseRecordId).subscribe(result => {
      this.rfidList = result;
    })
  }

  rollback() :void{
    this.dispenseManagementService.rollbackLocks(this.dispenseRecordDetail.dispenseRecordId).subscribe(result => {
      this.message.info('撤回成功');
      this.visibleChange.emit(false);
    },() => {
      this.message.warning('撤回失败');
      this.visibleChange.emit(false);
    })
  }
   // 取消Sidebar
   close() {
    this.visibleChange.emit(false);
  }

}
