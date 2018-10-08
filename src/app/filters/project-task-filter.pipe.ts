import { Pipe, PipeTransform } from '@angular/core';
import {Task} from '../model/task.component';

@Pipe({
  name: 'projectTaskFilter'
})
export class ProjectTaskFilterPipe implements PipeTransform {

  transform(values: Array<Task>, projectTaskSearchName?: string): any {
    if (!projectTaskSearchName || projectTaskSearchName.trim() === ''){
      return values;
    } 
    else{
      return values.filter(task => {
        return (task.project.projectName.toLowerCase().includes(projectTaskSearchName.trim().toLowerCase()));
      });
    }
   
  }

}
