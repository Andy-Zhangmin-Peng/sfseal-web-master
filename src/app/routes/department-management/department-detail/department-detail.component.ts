import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { PageModeEnum } from 'src/app/common/enum/page-mode.enum';
import { DepartmentModel } from 'src/app/common/model/company/department.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { DepartmentManagementService } from '../department-management.service';
import { NzMessageService } from 'ng-zorro-antd';
import { duplicateValueValidator } from 'src/app/common/form-validator/duplicate-value.validator';
@Component({
  selector: 'app-department-detail',
  templateUrl: './department-detail.component.html',
  styles: []
})
export class DepartmentDetailComponent implements OnInit {
  @Input() departmentDetail: DepartmentModel;
  @Input() pageMode: PageModeEnum;
  pageModeEnum = PageModeEnum;

  @Output() readonly visibleChange = new EventEmitter();

  departmentForm: FormGroup;
  constructor(
    private readonly _formBuilder: FormBuilder,
    private departmentManagementService: DepartmentManagementService,
    private message: NzMessageService,
  ) { }

  ngOnInit() {
    this.departmentForm = this.createSaffForm();
  }

  createSaffForm(): FormGroup {
    const formGroup = this._formBuilder.group({
      departmentName: [_.get(this.departmentDetail, 'departmentName'), Validators.required , [duplicateValueValidator(this.checkDepartmentnameExistingFunc, _.get(this.departmentDetail, 'departmentName'))],],
      departmentAdministrator: [_.get(this.departmentDetail, 'departmentAdministrator'), Validators.required],
      departmentPhoneNumber: [_.get(this.departmentDetail, 'departmentPhoneNumber'), [Validators.required,Validators.pattern(/^[0-9-()（）+]+$/)] , [duplicateValueValidator(this.checkPhoneNumberExistingFunc, _.get(this.departmentDetail, 'departmentPhoneNumber'))],],
    });
    return formGroup;
  }

  // 取消Sidebar
  close() {
    this.visibleChange.emit(false);
  }
  save(): void {
    const data = this.departmentForm.getRawValue();
    const department = new DepartmentModel();
    department.departmentName = data.departmentName;
    department.departmentAdministrator = data.departmentAdministrator;
    department.departmentPhoneNumber = data.departmentPhoneNumber;

    if (this.pageMode === this.pageModeEnum.EDIT) {
      department.createDate = this.departmentDetail.createDate;
      department.departmentId = this.departmentDetail.departmentId;
    }

    setTimeout(() => {
      if (this.pageMode === this.pageModeEnum.EDIT) {
        this.departmentManagementService.updateDepartment(department).subscribe(
          result => {
            this.visibleChange.emit(false);
            this.message.info('部门更新成功！');
          },
          () => {
            this.message.error('部门更新失败！');
          },
        );
      } else {
        this.departmentManagementService.createDepartment(department).subscribe(
          result => {
            this.visibleChange.emit(false);
            this.message.info('部门创建成功！');
          },
          () => {
            this.message.error('部门创建失败！');
          },
        );
      }
    }, 1000);

  }

  /**
   * 部门名重复校验
   */
  checkDepartmentnameExistingFunc = (data: any) => this.departmentManagementService.checkExistingValue('departmentName', data);

  /**
   * 部门电话重复校验
   */
  checkPhoneNumberExistingFunc = (data: any) => this.departmentManagementService.checkExistingValue('phoneNumber', data);
}
