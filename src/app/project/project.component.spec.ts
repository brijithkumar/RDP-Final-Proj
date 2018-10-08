import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectFilterPipe } from '../filters/project-filter.pipe';
import { ProjectComponent } from './project.component';
import { FormsModule } from '@angular/forms';
import { DialogService } from 'ng2-bootstrap-modal';
import { UserService } from '../services/user.service';
import { HttpClientModule } from '@angular/common/http';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import { getTestProjects } from '../mockTestData/project-test-data';
import { getTestUsers } from '../mockTestData/user-test-data';
import {MockDialogService} from '../mockTestData/mock.dialog.service';
import { MockUserService } from '../mockTestData/mock.user.service';
import { MockProjectService } from '../mockTestData/mock.project.service';
import { ProjectService } from '../services/project.service';
import { By } from '@angular/platform-browser';

const PROJECTS = getTestProjects();
const USERS = getTestUsers();

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectComponent,ProjectFilterPipe ],
      imports:[FormsModule,HttpClientModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers:[{provide:DialogService, useClass:MockDialogService },
        {provide:UserService, useClass: MockUserService},
        {provide:ProjectService, useClass: MockProjectService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.managers=USERS;
    component.projects=PROJECTS;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize projects', () => {
    const spy =spyOn(component, 'initializeProject').and.callThrough();
      fixture.detectChanges();
      component.initializeProject();
      expect(spy).toHaveBeenCalledWith();
  });

  it('should call ngOnit method', () => {
    const spy =spyOn(component, 'ngOnInit').and.callThrough();
      fixture.detectChanges();
      component.ngOnInit();
      expect(spy).toHaveBeenCalledWith();
  });

  

  it('should check the save project component to be called', () => {
    component.project=PROJECTS[0];
    component.editProjectMode='false';
    const spyOnAdd = spyOn(component, 'submitProject').and.callThrough();
     fixture.detectChanges();
     const button = fixture.debugElement.query(By.css('#addProject'));
     button.nativeElement.click();
     expect(spyOnAdd.calls.any()).toBe(true, 'component  onSubmit Save function called');
   });

   it('should check the update project component to be called', () => {
    component.project=PROJECTS[0];
    component.editProjectMode='true';
    const spyOnUpdate = spyOn(component, 'submitProject').and.callThrough();
     fixture.detectChanges();
     const button = fixture.debugElement.query(By.css('#updateProject'));
     button.nativeElement.click();
     expect(spyOnUpdate.calls.any()).toBe(true, 'component  onSubmit Update function called');
   });

   it('should call suspendProject function', () => {
    const suspendProjectSpy = spyOn(component, 'suspendProject').and.callThrough();
    fixture.detectChanges();
    let suspendProjectButton = fixture.debugElement.query(By.css('#suspendProject'));
    suspendProjectButton.triggerEventHandler('click', null);
    expect(suspendProjectSpy.calls.any()).toBe(true, 'component suspendProject called');
  });

  it('should call editProject function', () => {
    const editProjectSpy = spyOn(component, 'editProject').and.callThrough();
    fixture.detectChanges();
    let editProjectButton = fixture.debugElement.query(By.css('#editProject'));
    editProjectButton.triggerEventHandler('click', null);
    expect(editProjectSpy.calls.any()).toBe(true, 'component editProject called');
  });

  it('should search the managers when clicks user search button', () => {
    const searchManagerCompSpy = spyOn(component, 'searchManager').and.callThrough();
    fixture.detectChanges();
    let searchManagerButton = fixture.debugElement.query(By.css('#searchManager'));
    searchManagerButton.triggerEventHandler('click', null);
    expect(searchManagerCompSpy.calls.any()).toBe(true, 'component  searchManager called');
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

});
