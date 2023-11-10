import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ExceptionalSituationModel } from 'src/app/common/model/company/exceptional-situation.model';
import { PageModeEnum } from 'src/app/common/enum/page-mode.enum';
import { UploadFile } from 'ng-zorro-antd';
import * as _ from 'lodash';

@Component({
  selector: 'app-exceptional-situation-detail',
  templateUrl: './exceptional-situation-detail.component.html',
  styles: []
})
export class ExceptionalSituationDetailComponent implements OnInit {
  @Input() exceptionalSituationDetail: ExceptionalSituationModel;
  @Input() pageMode: PageModeEnum;
  pageModeEnum = PageModeEnum;

  @Output() readonly visibleChange = new EventEmitter();
  constructor() { }

  fileList = [];
  previewImage: string | undefined = '';
  previewVisible = false;
  
  ngOnInit() {
    if (!_.isEmpty(this.exceptionalSituationDetail) && !_.isEmpty(this.exceptionalSituationDetail.attachmentList)){
      this.exceptionalSituationDetail.attachmentList.forEach(attachment => {
        this.fileList.push({
          name:attachment.attachmentName,
          status: 'done',
          thumbUrl:'data:image/jpeg;base64,' + attachment.attachmentCode
        });
      })
    }
  }
  
  /**
   * 预览附件图片
   */
  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  };

  // 取消Sidebar
  close() {
    this.visibleChange.emit(false);
  }
}
