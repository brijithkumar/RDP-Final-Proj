import { Pipe, PipeTransform } from '@angular/core';
import {ParentTask} from '../model/parentTask.component';

@Pipe({
  name: 'parentTaskFilter'
})
export class ParentTaskFilterPipe implements PipeTransform {

  transform(values: Array<ParentTask>, parentTaskSearchName?: string): any {
    if (!parentTaskSearchName || parentTaskSearchName.trim() === ''){
      return values;
    } 
    else{
      return values.filter(parentTask => {
        return (parentTask.parentTaskName.toLowerCase().includes(parentTaskSearchName.trim().toLowerCase()));
      });
    }
   
  }

}
