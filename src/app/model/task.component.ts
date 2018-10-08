import {Project} from '../model/project.component';
import {User} from '../model/user.component';
import {ParentTask} from '../model/parentTask.component';

export class Task{
    taskId: number;
    taskName: String;
    startDate: String;
    endDate: String;    
    priority:number;
    taskStatus:String;
    project:Project;
    taskOwner:User;
    parentTask:ParentTask
    parentTaskSelectionModel:boolean;
}
