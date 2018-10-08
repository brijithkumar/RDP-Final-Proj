import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskComponent } from './task.component';
import { FormsModule } from '@angular/forms';
import { DialogService } from 'ng2-bootstrap-modal';
import { TaskService } from '../services/task.service';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import { UserService } from '../services/user.service';
import { RouterTestingModule } from '@angular/router/testing';
import {MockDialogService} from '../mockTestData/mock.dialog.service';
import { MockTaskService } from '../mockTestData/mock.task.service';
import { MockUserService } from '../mockTestData/mock.user.service';
import { getTestTasks } from '../mockTestData/task-test-data';
import { getParentTestTasks } from '../mockTestData/task-test-data';
import { getTestProjects } from '../mockTestData/project-test-data';
import { getTestUsers } from '../mockTestData/user-test-data';
import { By } from '@angular/platform-browser';
import { Task } from '../model/task.component';

const TASKS = getTestTasks();
const PARENT_TASKS = getParentTestTasks();
const PROJECTS = getTestProjects();
const USERS = getTestUsers();
let taskService:TaskService;

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskComponent ],
      imports:[FormsModule,HttpClientModule,RouterTestingModule.withRoutes([])],
      schemas: [NO_ERRORS_SCHEMA],
      providers:[{provide:DialogService, useClass:MockDialogService },
        {provide:TaskService, useClass: MockTaskService },
        {provide:UserService, useClass: MockUserService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.tasks=TASKS;
    component.taskOwners=USERS;
    component.projects=PROJECTS;
    component.parentTasks=PARENT_TASKS;
    component.task=TASKS[0];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should check the save task component to be called', () => {
    component.task=TASKS[0];
    component.task.parentTaskSelectionModel=true;
    component.editTaskMode='false';
    const spyOnAdd = spyOn(component, 'submitTask').and.callThrough();
     fixture.detectChanges();
     const button = fixture.debugElement.query(By.css('#addTask'));
     button.nativeElement.click();
     expect(spyOnAdd.calls.any()).toBe(true, 'component  onSubmit Save function called');
   });

   it('should check the update task component to be called', () => {
    component.task=TASKS[0];
    component.task.parentTaskSelectionModel=true;
    component.editTaskMode='true';
    const spyOnUpdate = spyOn(component, 'submitTask').and.callThrough();
     fixture.detectChanges();
     const button = fixture.debugElement.query(By.css('#updateTask'));
     button.nativeElement.click();
     expect(spyOnUpdate.calls.any()).toBe(true, 'component  onSubmit Update function called');
   });

   it('should initialize tasks', () => {
    const spy =spyOn(component, 'initializeTask').and.callThrough();
      fixture.detectChanges();
      component.initializeTask();
      expect(spy).toHaveBeenCalledWith();
  });

  it('should search the task owner when clicks user search button', () => {
    const searchUserCompSpy = spyOn(component, 'searchTaskOwner').and.callThrough();
    fixture.detectChanges();
    let searchUserB = fixture.debugElement.query(By.css('#searchTaskOwner'));
    searchUserB.triggerEventHandler('click', null);
    expect(searchUserCompSpy.calls.any()).toBe(true, 'component  searchTaskOwner called');
  });

  it('should search the projects when clicks user search button', () => {
    const searchProjectsCompSpy = spyOn(component, 'searchProjects').and.callThrough();
    fixture.detectChanges();
    let searchUserB = fixture.debugElement.query(By.css('#searchProject'));
    searchUserB.triggerEventHandler('click', null);
    expect(searchProjectsCompSpy.calls.any()).toBe(true, 'component  searchProjects called');
  });

  it('should search the parent tasks when clicks user search button', () => {
    const searchParentTasksCompSpy = spyOn(component, 'searchParentTasks').and.callThrough();
    fixture.detectChanges();
    let searchUserB = fixture.debugElement.query(By.css('#searchParentTask'));
    searchUserB.triggerEventHandler('click', null);
    expect(searchParentTasksCompSpy.calls.any()).toBe(true, 'component  searchParentTasks called');
  });

  it('should call the setTask', () => {
    const setTaskSpy = spyOn(component, 'setTask').and.callThrough();
    fixture.detectChanges();
    expect(setTaskSpy.calls.any()).toBe(false, 'component  setTaskSpy called');
  });


});
