import {User} from './user.component';

export class Project{
    projectId: number;
    projectName: String;
    enableProjectDate:boolean;
    startDate: String;
    endDate: String;   
    priority:number;
    manager:User;
    numberOfTasks:number;
    numberOfCompletedTasks:number; 
    completedStatus:String;
}
