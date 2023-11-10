import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { AccountModel } from 'src/app/common/model/user/account.model';
import { PageModeEnum } from 'src/app/common/enum/page-mode.enum';

@Component({
  selector: 'app-user-draw',
  templateUrl: './user-draw.component.html',
  styles: []
})
export class UserDrawComponent implements OnChanges {

  @Input() visible: boolean;
  @Input() accountDetail: AccountModel;
  @Input() pageMode = PageModeEnum.CREATE;

  @Output() readonly visibleChange = new EventEmitter();
  title = '';

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.pageMode === PageModeEnum.EDIT) {
      this.title = '编辑用户账号';
    } else if (this.pageMode === PageModeEnum.CREATE) {
      this.title = '创建用户账号';
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
