import { Project } from "../model/project.component";
import { User } from "../model/user.component";

const user: User = {
    userId: 1, firstName: 'First Name 1', lastName: 'Last Name 1',
    employeeId: 123
};
/** return array of test tasks */
export function getTestProjects(): Project[] {
    return [
        {
            projectId: 1, projectName: 'Project 1', startDate: '01/01/2010', enableProjectDate:false,
            endDate: '31/12/2010', priority: 1, numberOfTasks: 5, numberOfCompletedTasks: 0, completedStatus: 'No', 
            manager: user
        },
        {
            projectId: 1, projectName: 'Project 2', startDate: '01/01/2011', enableProjectDate:false,
            endDate: '31/12/2011', priority: 2, numberOfTasks: 2, numberOfCompletedTasks: 0, completedStatus: 'No', 
            manager: user
        }
    ];
}
