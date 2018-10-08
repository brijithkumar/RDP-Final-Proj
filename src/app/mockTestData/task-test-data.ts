import { Task } from "../model/task.component";
import { ParentTask } from "../model/parentTask.component";
import { Project } from "../model/project.component";
import { User } from "../model/user.component";

let project: Project = {
    projectId: 1, projectName: 'Project 1', startDate: '01/01/2010', enableProjectDate:false,
    endDate: '31/12/2010', priority: 1, numberOfTasks: 5, numberOfCompletedTasks: 0, completedStatus: 'No', manager: null
};

let manager: User = {
    userId: 1, firstName: 'First Name 1', lastName: 'Last Name 1',
    employeeId: 123
};

let parent: ParentTask = { parentTaskId: 1, parentTaskName: 'Parent Task 1' };

export function getTestTasks(): Task[] {
    return [
        {
            taskId: 1, taskName: 'Task 1', startDate: '01/01/2010',
            endDate: '30/12/2010', priority: 2, parentTask: parent, project: project, taskStatus: 'No', 
            parentTaskSelectionModel:false, taskOwner: manager
        },
        {
            taskId: 2, taskName: 'Task 2', startDate: '01/01/2011',
            endDate: '30/12/2011', priority: 3, parentTask: parent, project: project, taskStatus: 'No', 
            parentTaskSelectionModel:false, taskOwner: manager
        },
    ];
}

export function getParentTestTasks(): ParentTask[] {
    return [
        { parentTaskId: 1, parentTaskName: 'Parent Task 1' },
        { parentTaskId: 2, parentTaskName: 'Parent Task 2', }
    ];
}