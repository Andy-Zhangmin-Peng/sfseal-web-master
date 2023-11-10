import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ImportRecordModel } from 'src/app/common/model/company/import-record.model';
import { PageModeEnum } from 'src/app/common/enum/page-mode.enum';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Data } from '@angular/router';

@Component({
  selector: 'app-import-record-detail',
  templateUrl: './import-record-detail.component.html',
  styles: []
})
export class ImportRecordDetailComponent implements OnInit {
  @Input() importRecordDetail: ImportRecordModel;
  @Input() pageMode: PageModeEnum;
  @Output() readonly visibleChange = new EventEmitter();
  @Input() rfidList = [];
  pageModeEnum = PageModeEnum;

  importRecordForm : FormGroup;
  constructor(
    private readonly _formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.importRecordForm = this.createForm()
  }

  createForm(): FormGroup {
    const formGroup = this._formBuilder.group({
    });
    return formGroup;
  }

  // 取消Sidebar
  close() {
    this.visibleChange.emit(false);
  }
}
