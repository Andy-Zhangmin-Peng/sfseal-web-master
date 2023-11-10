import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { CompanyModel } from 'src/app/common/model/company/company.model';
import { PageModeEnum } from 'src/app/common/enum/page-mode.enum';

@Component({
  selector: 'app-company-draw',
  templateUrl: './company-draw.component.html',
  styles: []
})
export class CompanyDrawComponent {
  @Input() visible: boolean;
  @Input() companyDetail: CompanyModel;
  @Input() pageMode = PageModeEnum.CREATE;
  @Input() roleList: [];
  @Input() companyList = [];

  @Output() readonly visibleChange = new EventEmitter();
  title = '';

  constructor() {}

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnChanges(changes: SimpleChanges): void {
    if (this.pageMode === PageModeEnum.EDIT) {
      this.title = '编辑企业';
    } else if (this.pageMode === PageModeEnum.CREATE) {
      this.title = '创建企业';
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
