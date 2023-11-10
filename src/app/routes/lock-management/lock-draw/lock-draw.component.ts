import { Component, OnInit, Input, Output, SimpleChanges, EventEmitter, OnChanges } from '@angular/core';
import { LockModel } from 'src/app/common/model/company/lock.model';
import { PageModeEnum } from 'src/app/common/enum/page-mode.enum';

@Component({
  selector: 'app-lock-draw',
  templateUrl: './lock-draw.component.html',
  styles: []
})
export class LockDrawComponent implements OnChanges {
  @Input() visible: boolean;
  @Input() lockDetail: LockModel;
  @Input() pageMode = PageModeEnum.CREATE;
  @Input() companyList = [];

  @Output() readonly visibleChange = new EventEmitter();
  title = '';

  constructor() {}

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnChanges(changes: SimpleChanges): void {
    if (this.pageMode === PageModeEnum.EDIT) {
      this.title = '编辑电子封锁';
    } else if (this.pageMode === PageModeEnum.CREATE) {
      this.title = '创建电子封锁';
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
