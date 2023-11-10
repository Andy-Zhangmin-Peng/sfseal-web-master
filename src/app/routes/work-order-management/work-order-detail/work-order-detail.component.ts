import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { WorkOrderModel } from 'src/app/common/model/company/work-order.model';
import { PageModeEnum } from 'src/app/common/enum/page-mode.enum';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { WorkOrderManagementService } from '../work-order-management.service';
import { WorkOrderAddressModel } from 'src/app/common/model/company/work-order-address.model';
import { LockModel } from 'src/app/common/model/company/lock.model';
import { TransportModel } from 'src/app/common/model/company/transport.model';
import { NzMessageService, UploadFile, UploadFilter } from 'ng-zorro-antd';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-work-order-detail',
  templateUrl: './work-order-detail.component.html',
  styles: [
    
  ]
})
export class WorkOrderDetailComponent implements OnInit{

  constructor(
    private readonly _formBuilder: FormBuilder,
    private message: NzMessageService,
    private readonly workOrderManagementService: WorkOrderManagementService,
  ) { }
  @Input() workOrderDetail: WorkOrderModel;
  @Input() pageMode: PageModeEnum;
  @Output() readonly visibleChange = new EventEmitter();
  @Input() unusedLockList:[];

  pageModeEnum = PageModeEnum;

  workOrderForm : FormGroup;

  // For tree select
  // 选择的电子封锁value
  value: string[] = [];
  nodes = [];
  
  // 车船号tag
  transportags = []
  inputVisible = false;
  inputValue = '';
  @ViewChild('inputElement', { static: false }) inputElement: ElementRef;

  // 上传附件
  fileList = [];
  showUploadList = {
    showPreviewIcon: true,
    showRemoveIcon: true,
    hidePreviewIconInNonImage: true
  };
  previewImage: string | undefined = '';
  previewVisible = false;
  startAddress = '';
  endAddress = '';
  isVisible = false;
  lockSealInfo : any;
  sealFileList = [];
  sealOffFileList = [];
  sealAttachmentPreviewImage: string | undefined = '';
  sealAttachmentPreviewVisible = false;

  ngOnInit() {
    this.unusedLockList.forEach(element => {
        this.nodes.push({
          title: element,
          key: element,
          value: element,
      });
    });

    // 初始化电子封锁选项
    if (!_.isEmpty(this.workOrderDetail) && !_.isEmpty(this.workOrderDetail.lockList)){
        this.workOrderDetail.lockList.forEach(lock => {
          this.nodes.push({
            title: lock.barCode,
            key: lock.barCode,
            value: lock.barCode,
          });
          this.value.push(lock.barCode);
        });
    }

    // 初始化工单附件
    if (!_.isEmpty(this.workOrderDetail) && !_.isEmpty(this.workOrderDetail.attachment)){

      this.fileList.push({
        name:this.workOrderDetail.attachment.attachmentName,
        status: 'done',
        thumbUrl:'data:image/jpeg;base64,' + this.workOrderDetail.attachment.attachmentCode
      });
    }

    // 初始化车船号标签
    if (!_.isEmpty(this.workOrderDetail) && !_.isEmpty(this.workOrderDetail.transportList)){
        this.workOrderDetail.transportList.forEach( transport => {
          this.transportags.push(transport);
        });
    }
    this.startAddress = _.get(_.find(_.get(this.workOrderDetail, 'addressList'),{"addressType":30001}),'addressDetail');
    this.endAddress = _.get(_.find(_.get(this.workOrderDetail, 'addressList'),{"addressType":30002}),'addressDetail');

    this.workOrderForm = this.createWorkOrderForm();
  }

  createWorkOrderForm(): FormGroup {
    const formGroup = this._formBuilder.group({
      barCode:['', Validators.required,],
      owner: [_.get(this.workOrderDetail, 'owner'), Validators.required,],
      carriera: [_.get(this.workOrderDetail, 'carriera'), Validators.required,],
      wayBillNumber: [_.get(this.workOrderDetail, 'wayBillNumber')],
      transport: [_.get(this.workOrderDetail, 'transportList'),Validators.required],
      startAddress: [ _.get(_.find(_.get(this.workOrderDetail, 'addressList'),{"addressType":30001}),'addressDetail'), Validators.required,],
      endAddress: [ _.get(_.find(_.get(this.workOrderDetail, 'addressList'),{"addressType":30002}),'addressDetail'), Validators.required,],
      detail: [_.get(this.workOrderDetail, 'detail'),],
      productDetail:[_.get(this.workOrderDetail, 'productDetail'),]
    });
    return formGroup;
  }

  onChange($event: string[]): void {
    // console.log($event);
  }
  // remove tag
  handleClose(removedTag: {}): void {
    this.transportags = this.transportags.filter(tag => tag !== removedTag);
  }
  showInput(): void {
    this.inputVisible = true;
    setTimeout(() => {
      this.inputElement.nativeElement.focus();
    }, 10);
  }

  /**
   * 创建transport
   */
  handleInputConfirm(): void {
    if (this.inputValue !== '' && this.inputValue !== null && this.inputValue !== undefined){
      this.workOrderManagementService.createTransport(this.inputValue).subscribe(res => {
        this.transportags = [...this.transportags, res];
        this.inputValue = '';
        this.inputVisible = false;
      })
    } else {
      this.inputValue = '';
      this.inputVisible = false;
    }
  }

  /**
   * 预览附件图片
   */
  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  };

  handleSealPreview = async (file: UploadFile) => {
    this.sealAttachmentPreviewImage = file.url || file.thumbUrl;
    this.sealAttachmentPreviewVisible = true;
  };

  beforeUpload = (file: UploadFile) => {
    this.fileList = this.fileList.concat(file);
    return new Observable((observer: Observer<boolean>) => {
      const isJPG = file.type === 'image/jpeg';
      if (!isJPG) {
        this.message.error('You can only upload JPG file!');
        observer.complete();
        return;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.message.error('Image must smaller than 2MB!');
        observer.complete();
        return;
      }
    });
  };

  save(): void {

    const formData = new FormData();

    const data = this.workOrderForm.getRawValue();
    const workOrderModel = new WorkOrderModel();
    const addressList = new Array<WorkOrderAddressModel>();
    const lockList = new Array<LockModel>();
    const transportList = new  Array<TransportModel>();

    workOrderModel.owner = data.owner;
    workOrderModel.carriera = data.carriera;
    workOrderModel.productDetail = data.productDetail;
    workOrderModel.statusCode = 20001;
    workOrderModel.wayBillNumber = data.wayBillNumber;
    workOrderModel.attachmentId = this.fileList.length >0 ? this.fileList[0].response.attachmentId : null;
    
    const startAddress = new WorkOrderAddressModel();
    startAddress.addressDetail = data.startAddress;
    startAddress.addressType = 30001;
    addressList.push(startAddress);

    const endAddress = new WorkOrderAddressModel();
    endAddress.addressDetail = data.endAddress;
    endAddress.addressType = 30002;
    addressList.push(endAddress);

    this.value.forEach(barCode =>{
      const lock = new LockModel();
      lock.barCode = barCode;
      lockList.push(lock);
    })

    this.transportags.forEach(transport => {
      const tran = new TransportModel();
      tran.id = transport.id;
      tran.transprortId = transport.transprortId;
      tran.companyId = transport.companyId;
      transportList.push(tran);
    });

    workOrderModel.lockList = lockList;
    workOrderModel.addressList = addressList;
    workOrderModel.transportList = transportList;

    if (this.pageMode === this.pageModeEnum.EDIT) {
      workOrderModel.createDate = this.workOrderDetail.createDate;
      workOrderModel.companyId = this.workOrderDetail.companyId;
      workOrderModel.workOrderId =  this.workOrderDetail.workOrderId;
    }

    if (this.pageMode === this.pageModeEnum.EDIT) {
      this.workOrderManagementService.updateWorkOrder(workOrderModel).subscribe(result => {
        this.visibleChange.emit(false);
        this.message.info('工单更新成功！');
      },
      ()=> {
        this.message.warning('工单更新失败！');
      });
    } else {
      this.workOrderManagementService.createWorkOrder(workOrderModel).subscribe(result => {
        this.visibleChange.emit(false);
        this.message.info('工单创建成功！');
      },
      ()=> {
        this.message.warning('工单创建失败！');
      });
    }
  }

showLocation(data:any){
  console.log(data);
}

  // 取消Sidebar
  close() {
    this.visibleChange.emit(false);
  }

  viewLockAttachment(data:any) {
    this.workOrderManagementService.getLockSealInfoByBarCode(data).subscribe(result => {
      this.isVisible = true;
      this.lockSealInfo = result;
      result.attachmentModelList.forEach(attachment => {
        if(attachment.attachmentType === 60002) {
          this.sealFileList.push({
            name:attachment.attachmentName,
            status: 'done',
            thumbUrl:'data:image/jpeg;base64,' + attachment.attachmentCode
          });
        }
        if(attachment.attachmentType === 60003) {
          this.sealOffFileList.push({
            name:attachment.attachmentName,
            status: 'done',
            thumbUrl:'data:image/jpeg;base64,' + attachment.attachmentCode
          });
        }
      })
    });
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
