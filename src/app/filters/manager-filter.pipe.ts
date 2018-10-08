import { Pipe, PipeTransform } from '@angular/core';
import {User} from '../model/user.component';

@Pipe({
  name: 'managerFilter'
})
export class ManagerFilterPipe implements PipeTransform {

  transform(values: Array<User>, managerSearchName?: string): any {
    if (!managerSearchName || managerSearchName.trim() === ''){
      return values;
    } 
    else{
      return values.filter(user => {
        return (user.firstName.toLowerCase().includes(managerSearchName.toLowerCase()) || 
        user.lastName.toLowerCase().includes(managerSearchName.toLowerCase()));
      });
    }
   
  }

}
