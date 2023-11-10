import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { PageModeEnum } from 'src/app/common/enum/page-mode.enum';
import { ExceptionalSituationModel } from 'src/app/common/model/company/exceptional-situation.model';

@Component({
  selector: 'app-exceptional-situation-draw',
  templateUrl: './exceptional-situation-draw.component.html',
  styles: []
})
export class ExceptionalSituationDrawComponent implements OnChanges {

  @Input() visible: boolean;
  @Input() exceptionalSituationDetail: ExceptionalSituationModel;
  @Input() pageMode = PageModeEnum.CREATE;


  @Output() readonly visibleChange = new EventEmitter();
  title = '';

  constructor() {}

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnChanges(changes: SimpleChanges): void {
    if (this.pageMode === PageModeEnum.VIEW) {
      this.title = '查看异常';
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
