import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LockModel } from 'src/app/common/model/company/lock.model';
import { PageModeEnum } from 'src/app/common/enum/page-mode.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { LockManagementService } from '../lock-management.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-lock-detail',
  templateUrl: './lock-detail.component.html',
  styles: []
})
export class LockDetailComponent implements OnInit {

  @Input() lockModel : LockModel;
  @Input() pageMode: PageModeEnum;
  @Output() readonly visibleChange = new EventEmitter();
  @Input() companyList = [];

  pageModeEnum = PageModeEnum;
  lockForm : FormGroup;
  
  constructor(
    private readonly _formBuilder: FormBuilder,
    private lockManagementService: LockManagementService,
    private message: NzMessageService,
  ) { }

  ngOnInit() {
    this.lockForm = this.createSaffForm();
  }

  createSaffForm(): FormGroup {
    const formGroup = this._formBuilder.group({
      barCode: [_.get(this.lockModel, 'barCode'), Validators.required,],
      rfid: [_.get(this.lockModel, 'rfid'), Validators.required,],
      boxId: [_.get(this.lockModel, 'boxId'), Validators.required,],
      companyId: [_.get(this.lockModel, 'companyId'), Validators.required,],
    });
    return formGroup;
  }
   // 取消Sidebar
   close() {
    this.visibleChange.emit(false);
  }

  save(): void {
    const data = this.lockForm.getRawValue();
    const lock = this.lockModel;
 
    lock.companyId = data.companyId;

    setTimeout(() => {
      this.lockManagementService.updateLock(lock).subscribe(
        result => {
          this.visibleChange.emit(false);
          this.message.info('电子封锁更新成功！');
        },
        () => {
          this.message.error('电子封锁更新失败！');
        },
      );
    }, 1000);
  }

}
