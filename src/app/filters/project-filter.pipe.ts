import { Pipe, PipeTransform } from '@angular/core';
import {Project} from '../model/project.component';

@Pipe({
  name: 'projectFilter'
})
export class ProjectFilterPipe implements PipeTransform {


  transform(values: Array<Project>, projectSearchName?: string): any {
    if (!projectSearchName || projectSearchName.trim() === ''){
      return values;
    } 
    else{
      return values.filter(project => {
        return (project.projectName.toLowerCase().includes(projectSearchName.trim().toLowerCase()));
      });
    }
   
  }
}
