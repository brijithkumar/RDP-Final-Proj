import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { UserService } from '../services/user.service';
import { HttpClientModule } from '@angular/common/http';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ManagerFilterPipe } from '../filters/manager-filter.pipe';
import { getTestUsers } from '../mockTestData/user-test-data';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { MockUserService } from '../mockTestData/mock.user.service';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { combineAll } from 'rxjs/internal/operators/combineAll';
import {MockDialogService} from '../mockTestData/mock.dialog.service';

let userService:UserService;
const USERS = getTestUsers();


describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserComponent,ManagerFilterPipe ],
      imports:[FormsModule,HttpClientModule,BrowserModule,CommonModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers:[{provide:DialogService, useClass:MockDialogService },
        {provide:UserService, useClass: MockUserService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    userService=TestBed.get(UserService);
    fixture.detectChanges();
    component.users = USERS;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check the save user component to be called', () => {
    component.user=USERS[0];
    component.editUserMode='false';
    const spyOnAdd = spyOn(component, 'addUser').and.callThrough();
     fixture.detectChanges();
     const button = fixture.debugElement.query(By.css('#addUser'));
     button.nativeElement.click();
     expect(spyOnAdd.calls.any()).toBe(true, 'component  onSubmit Save function called');
   });

   it('should check the update user component to be called', () => {
    component.user=USERS[0];
    component.editUserMode='true';
    const spyOnUpdate = spyOn(component, 'addUser').and.callThrough();
     fixture.detectChanges();
     const button = fixture.debugElement.query(By.css('#updateUser'));
     button.nativeElement.click();
     expect(spyOnUpdate.calls.any()).toBe(true, 'component  onSubmit Update function called');
   });

   it('checking inputs valid event', () => {
    component.ngOnInit();
    component.user.firstName = 'Test';
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('#addUser'));
    button.triggerEventHandler('click', null);
    expect(component.user.firstName).toBe("Test");
});  


it('should delete the user', () => {
  const spy = spyOn(userService, 'deleteUser').and.callThrough();
  component.user = USERS[0];
  component.deleteUser(component.user);
  fixture.detectChanges();
  expect(spy).toHaveBeenCalledWith(1);
 });
  
 it('should get all users', () => {
  const spy =spyOn(userService, 'getUsers').and.callThrough();
  component.getUsers();
  fixture.detectChanges();
  expect(spy).toHaveBeenCalledWith();
});

it('should initialize user', () => {
  const spy =spyOn(component, 'initiliazeUser').and.callThrough();
    fixture.detectChanges();
    component.initiliazeUser();
    expect(spy).toHaveBeenCalledWith();
});

it('should sortBy when click first name button', () => {
  const sortUsers = spyOn(component, 'sortBy').and.callThrough();
  component.isDesc = false;
  fixture.detectChanges();
  let sortFirstNameButton = fixture.debugElement.query(By.css('#sortFirstName'));
  sortFirstNameButton.triggerEventHandler('click', null);
  expect(sortUsers.calls.any()).toBe(true, 'component sort First Name called');
});


it('should sortBy when click last name button', () => {
  const sortUsers = spyOn(component, 'sortBy').and.callThrough();
  component.isDesc = false;
  fixture.detectChanges();
  let sortLastNameButton = fixture.debugElement.query(By.css('#sortLastName'));
  sortLastNameButton.triggerEventHandler('click', null);
  expect(sortUsers.calls.any()).toBe(true, 'component sort Last Name called');
});

it('should sortBy when click employee Id button', () => {
  const sortUsers = spyOn(component, 'sortBy').and.callThrough();
  component.isDesc = false;
  fixture.detectChanges();
  let sortEmployeeIdButton = fixture.debugElement.query(By.css('#sortEmployeeId'));
  sortEmployeeIdButton.triggerEventHandler('click', null);
  expect(sortUsers.calls.any()).toBe(true, 'component sort Employee Id called');
});

it('should call editUser function', () => {
  const setUserSpy = spyOn(component, 'editUser').and.callThrough();
  fixture.detectChanges();
  let editUserButton = fixture.debugElement.query(By.css('#editUser'));
  editUserButton.triggerEventHandler('click', null);
  expect(setUserSpy.calls.any()).toBe(true, 'component editUser called');
});

});
