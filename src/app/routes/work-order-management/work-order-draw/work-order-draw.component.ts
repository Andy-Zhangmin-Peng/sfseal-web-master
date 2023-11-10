import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { PageModeEnum } from 'src/app/common/enum/page-mode.enum';
import { WorkOrderModel } from 'src/app/common/model/company/work-order.model';

@Component({
  selector: 'app-work-order-draw',
  templateUrl: './work-order-draw.component.html',
  styles: []
})
export class WorkOrderDrawComponent implements OnChanges {
  @Input() visible: boolean;
  @Input() pageMode = PageModeEnum.CREATE;
  @Input() workOrderDetail: WorkOrderModel;
  @Input() unusedLockList:[];
  @Output() readonly visibleChange = new EventEmitter();
  title = '';

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.pageMode === PageModeEnum.EDIT) {
      this.title = '编辑工单';
    } else if (this.pageMode === PageModeEnum.CREATE) {
      this.title = '创建工单';
    }else if (this.pageMode === PageModeEnum.VIEW) {
      this.title = '查看工单';
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
