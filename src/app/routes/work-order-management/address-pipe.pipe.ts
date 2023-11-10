import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addressPipe'
})
export class AddressPipePipe implements PipeTransform {
  addressDetail = '';
  transform(value: any, ...args: number[]): any {
    
    value.forEach(element => {
      if (element.addressType === args[0]){
        this.addressDetail =  element.addressDetail;
      }
    });
    return this.addressDetail
  }

}
