import { Component, OnInit, OnChanges, Input, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { PageModeEnum } from 'src/app/common/enum/page-mode.enum';
import { DispenseRecordModel } from 'src/app/common/model/company/dispense-record.model';

@Component({
  selector: 'app-dispense-draw',
  templateUrl: './dispense-draw.component.html',
  styles: []
})
export class DispenseDrawComponent implements OnChanges {
  
  @Input() visible: boolean;
  @Input() dispenseRecordDetail: DispenseRecordModel;
  @Input() pageMode = PageModeEnum.CREATE;
  @Input() roleList: [];
  @Input() companyList = [];

  @Output() readonly visibleChange = new EventEmitter();
  title = '';

  constructor() {}

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnChanges(changes: SimpleChanges): void {
    if (this.pageMode === PageModeEnum.VIEW) {
      this.title = '查看分发记录';
    } else if (this.pageMode === PageModeEnum.EDIT) {
      this.title = '重新分发';
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
