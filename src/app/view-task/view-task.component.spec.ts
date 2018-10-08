import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewTaskComponent } from './view-task.component';
import { FormsModule } from '@angular/forms';
import { DialogService } from 'ng2-bootstrap-modal';
import { UserService } from '../services/user.service';
import { HttpClientModule } from '@angular/common/http';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import { ProjectTaskFilterPipe } from '../filters/project-task-filter.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { getTestProjects } from '../mockTestData/project-test-data';
import { getTestTasks } from '../mockTestData/task-test-data';
import {MockDialogService} from '../mockTestData/mock.dialog.service';
import { MockProjectService } from '../mockTestData/mock.project.service';
import { MockTaskService } from '../mockTestData/mock.task.service';
import { By } from '@angular/platform-browser';
import { TaskService } from '../services/task.service';
import { ProjectService } from '../services/project.service';

const TASKS = getTestTasks();
const PROJECTS = getTestProjects();

describe('ViewTaskComponent', () => {
  let component: ViewTaskComponent;
  let fixture: ComponentFixture<ViewTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTaskComponent,ProjectTaskFilterPipe ],
      imports:[FormsModule,HttpClientModule,RouterTestingModule.withRoutes([])],
      schemas: [NO_ERRORS_SCHEMA],
      providers:[{provide:DialogService, useClass:MockDialogService },
        {provide:TaskService, useClass: MockTaskService},
        {provide:ProjectService, useClass: MockProjectService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.projects=PROJECTS;
    component.tasks=TASKS;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize view tasks', () => {
    const spy =spyOn(component, 'initializeTask').and.callThrough();
      fixture.detectChanges();
      component.initializeTask();
      expect(spy).toHaveBeenCalledWith();
  });

  it('should call ngOnit method', () => {
    const spy =spyOn(component, 'ngOnInit').and.callThrough();
      fixture.detectChanges();
      component.ngOnInit();
      expect(spy).toHaveBeenCalledWith();
  });

  it('should call endTask function', () => {
    const endTaskSpy = spyOn(component, 'endTask').and.callThrough();
    fixture.detectChanges();
    let endTaskButton = fixture.debugElement.query(By.css('#endTask'));
    endTaskButton.triggerEventHandler('click', null);
    expect(endTaskSpy.calls.any()).toBe(true, 'component endTask called');
  });

  it('should search the projects when clicks user search button', () => {
    const searchProjectsCompSpy = spyOn(component, 'searchProjects').and.callThrough();
    fixture.detectChanges();
    let searchUserB = fixture.debugElement.query(By.css('#searchProject'));
    searchUserB.triggerEventHandler('click', null);
    expect(searchProjectsCompSpy.calls.any()).toBe(true, 'component  searchProjects called');
  });

  it('should sort priority ascending  when click priority button', () => {
    const sortProjects = spyOn(component, 'sortBy').and.callThrough();
    component.isDesc = false;
    fixture.detectChanges();
    let sortPriorityButton = fixture.debugElement.query(By.css('#prioritySort'));
    sortPriorityButton.triggerEventHandler('click', null);
    expect(sortProjects.calls.any()).toBe(true, 'component sort priority called');
  });

  it('should sort priority descending  when click priority button', () => {
    const sortProjects = spyOn(component, 'sortBy').and.callThrough();
    component.isDesc = true;
    fixture.detectChanges();
    let sortPriorityButton = fixture.debugElement.query(By.css('#prioritySort'));
    sortPriorityButton.triggerEventHandler('click', null);
    expect(sortProjects.calls.any()).toBe(true, 'component sort priority called');
  });

  it('should sort start date ascending when click start date button', () => {
    const sortProjects = spyOn(component, 'sortBy').and.callThrough();
    component.isDesc = false;
    fixture.detectChanges();
    let sortStartDateButton = fixture.debugElement.query(By.css('#startDateSort'));
    sortStartDateButton.triggerEventHandler('click', null);
    expect(sortProjects.calls.any()).toBe(true, 'component sort start Date called');
  });

  it('should sort start date descending when click start date button ', () => {
    const sortProjects = spyOn(component, 'sortBy').and.callThrough();
    component.isDesc = true;
    fixture.detectChanges();
    let sortStartDateButton = fixture.debugElement.query(By.css('#startDateSort'));
    sortStartDateButton.triggerEventHandler('click', null);
    expect(sortProjects.calls.any()).toBe(true, 'component sort start Date called');
  });

  it('should sort end date ascending  when click end date button', () => {
    const sortProjects = spyOn(component, 'sortBy').and.callThrough();
    component.isDesc = false;
    fixture.detectChanges();
    let sortEndDateButton = fixture.debugElement.query(By.css('#endDateSort'));
    sortEndDateButton.triggerEventHandler('click', null);
    expect(sortProjects.calls.any()).toBe(true, 'component sort end Date called');
  });

  it('should sort end date descending when click end date button ', () => {
    const sortProjects = spyOn(component, 'sortBy').and.callThrough();
    component.isDesc = true;
    fixture.detectChanges();
    let sortEndDateButton = fixture.debugElement.query(By.css('#endDateSort'));
    sortEndDateButton.triggerEventHandler('click', null);
    expect(sortProjects.calls.any()).toBe(true, 'component sort end Date called');
  });

});
