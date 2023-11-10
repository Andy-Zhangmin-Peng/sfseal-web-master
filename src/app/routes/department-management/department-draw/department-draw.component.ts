import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { DepartmentModel } from 'src/app/common/model/company/department.model';
import { PageModeEnum } from 'src/app/common/enum/page-mode.enum';

@Component({
  selector: 'app-department-draw',
  templateUrl: './department-draw.component.html',
  styles: []
})
export class DepartmentDrawComponent {
  @Input() visible: boolean;
  @Input() departmentDetail: DepartmentModel;
  @Input() pageMode = PageModeEnum.CREATE;
  @Input() roleList: [];
  @Input() companyList = [];

  @Output() readonly visibleChange = new EventEmitter();
  title = '';

  constructor() {}

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnChanges(changes: SimpleChanges): void {
    if (this.pageMode === PageModeEnum.EDIT) {
      this.title = '编辑部门';
    } else if (this.pageMode === PageModeEnum.CREATE) {
      this.title = '创建部门';
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
