import { Injectable, Inject } from '@angular/core';
import { StaffHttpServiceInterface } from '@core/services/http/staff-http.service.interface';
import { AccountModel } from 'src/app/common/model/user/account.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(
    @Inject('StaffHttpServiceInterface')
    private readonly staffHttpServiceInterface: StaffHttpServiceInterface,
  ) { }
  
  /**
   * 更新一个企业管理员信息
   *
   * @param account the StaffModel
   */
  updateFullStaff(account: AccountModel): Observable<any> {
    return this.staffHttpServiceInterface.updateFullStaff(account);
  }

  /**
   * 校验数据是否已经存在
   * @param valueType 需要校验的元素
   * @param value 需要校验的值
   */
  checkExistingValue(valueType: string, value: string): Observable<any> {
    return this.staffHttpServiceInterface.checkExistingValue(valueType, value);
  }

}
