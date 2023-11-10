import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { ImportRecordModel } from 'src/app/common/model/company/import-record.model';
import { PageModeEnum } from 'src/app/common/enum/page-mode.enum';

@Component({
  selector: 'app-import-record-draw',
  templateUrl: './import-record-draw.component.html',
  styles: []
})
export class ImportRecordDrawComponent implements OnChanges {
 
  @Input() visible: boolean;
  @Input() importRecordDetail: ImportRecordModel;
  @Input() pageMode = PageModeEnum.CREATE;
  @Input() rfidList = [];
  
  @Output() readonly visibleChange = new EventEmitter();
  title = '';

  constructor() {}

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnChanges(changes: SimpleChanges): void {
    if (this.pageMode === PageModeEnum.VIEW) {
      this.title = '查看导入记录';
    }
  }
  cancel() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  onVisibleChange($event) {
    this.visible = $event;
    this.visibleChange.emit($event);
  }


}
