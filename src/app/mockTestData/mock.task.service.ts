import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ParentTask } from '../model/parentTask.component';
import { Task } from '../model/task.component';
import { TaskService } from '../services/task.service';
import { asyncData } from './async-observable-helpers';
import { getParentTestTasks, getTestTasks } from './task-test-data';

@Injectable({
    providedIn: 'root'
})
export class MockTaskService extends TaskService {
    constructor() {
        super(null);
    }
    tasks: Task[] = getTestTasks();
    parentTasks: ParentTask[] = getParentTestTasks();
    lastResult: Observable<any>;

    getTasks(): Observable<Task[]> {
        return this.lastResult = asyncData(this.tasks);
    }

    getTask(id: number): Observable<Task> {
        let task = this.tasks.find(h => h.taskId === id);
        return this.lastResult = asyncData(task);

    }

    addTask(task: Task): Observable<Task> {
        return this.lastResult = this.getTask(task.taskId).pipe(
            map(h => {
                if (h) {
                    this.errorMessage='';
                    return Object.assign(h, task);
                }
                throw new Error(`Task ${task.taskId} not saved`);
            })
        );
    }

    updateTask(task: Task): Observable<Task> {
        return this.lastResult = this.getTask(task.taskId).pipe(
            map(h => {
                if (h) {
                    this.errorMessage='';
                    return Object.assign(h, task);
                }
                throw new Error(`Task ${task.taskId} not updated`);
            })
        );
    }

    getParentTasks(): Observable<ParentTask[]> {
        return asyncData(this.parentTasks);
    }


    /*endTask(task): Observable<any> {
        const id = typeof task === 'number' ? task : task.taskId;
        return this.lastResult = this.getTask(id).pipe(
            map(h => {
                if (h) {
                    this.errorMessage='';
                    return Object.assign(h, this.getTask(id));
                }
                throw new Error('Task  not found');
            })
        );
    }*/
}