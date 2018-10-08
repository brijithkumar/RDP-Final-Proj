import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';
import { HttpClient,HttpClientModule,HttpResponse } from '@angular/common/http';
import {HttpTestingController,HttpClientTestingModule} from '@angular/common/http/testing';
import {Task} from '../model/task.component';
import { getTestTasks } from '../mockTestData/task-test-data';
import { ParentTask } from '../model/parentTask.component';

describe('TaskService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let taskService: TaskService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService]
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    taskService = TestBed.get(TaskService);
  });

  describe('getTasks', () => {
    let returnTasks: Task[];
    let getTaskUrl: any;

    beforeEach(() => {
      getTaskUrl = taskService.baseUrl + 'getTasks';
      returnTasks =getTestTasks();
    });

    it('should return expected tasks (called once)', () => {
      taskService.getTasks().subscribe(
        tasks => expect(tasks).toEqual(returnTasks, 'should return tasks'),
        fail
      );
      const req = httpTestingController.expectOne(getTaskUrl);
      expect(req.request.method).toEqual('GET');
      req.flush(returnTasks);
    });

  });

  it('should be created', () => {
    const service: TaskService = TestBed.get(TaskService);
    expect(service).toBeTruthy();
  });

  describe('updateTask', () => {
    let updateTaskUrl: any;
    beforeEach(() => {
      taskService = TestBed.get(TaskService);
      updateTaskUrl = taskService.baseUrl + 'updateTask';
    });

    it('should update a task and return it', () => {
      let updateTask: Task = {
        taskId: 1, taskName: 'Task 1', startDate: '01/01/2010',parentTaskSelectionModel:false,
        endDate: '31/12/2010', priority: 2, parentTask: null,  taskStatus: 'No', project: null, taskOwner: null
      };

      taskService.updateTask(updateTask).subscribe(
        task => expect(task).toEqual(updateTask, 'should return the task'),
        fail
      );
      const req = httpTestingController.expectOne(updateTaskUrl);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(updateTask);
    });
  });

  describe('addTask', () => {
    let addTaskUrl:any;
    beforeEach(() => {
       addTaskUrl = taskService.baseUrl + 'addTask';
    });

    it('should create a task and return it', () => {

      let addTask: Task = {
        taskId: 1, taskName: 'Task 1', startDate: '01/01/2010',parentTaskSelectionModel:false,
        endDate: '31/12/2010', priority: 2, parentTask: null,  taskStatus: 'No', project: null, taskOwner: null
      };

      taskService.addTask(addTask).subscribe(
        task => expect(task).toEqual(addTask, 'should return the task'),
        fail
      );
      const req = httpTestingController.expectOne(addTaskUrl);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(addTask);

    });
  });

  describe('getparentTasks', () => {
    let returnTasks: ParentTask[];
    let getTaskUrl: any;

    beforeEach(() => {
      getTaskUrl = taskService.baseUrl + 'getParentTasks';
      returnTasks = [
          { parentTaskId:1, parentTaskName:'ParentTask 1' },
          { parentTaskId:1, parentTaskName:'ParentTask 2' }
        ]
    });

    it('should return expected tasks (called once)', () => {
      taskService.getParentTasks().subscribe(
        parentTasks => expect(parentTasks).toEqual(returnTasks, 'should return tasks'),
        fail
      );
      const req = httpTestingController.expectOne(getTaskUrl);
      expect(req.request.method).toEqual('GET');
      req.flush(returnTasks);
    });

  });

  afterEach(() => {
    httpTestingController.verify();
  });

});
