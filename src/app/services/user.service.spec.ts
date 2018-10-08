import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { UserService } from './user.service';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import {HttpTestingController,HttpClientTestingModule} from '@angular/common/http/testing';
import { getTestUsers } from '../mockTestData/user-test-data';
import { User } from '../model/user.component';


const USERS=getTestUsers();

describe('UserService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let userService: UserService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    userService = TestBed.get(UserService);
  });

  afterEach(()=>{
    httpTestingController.verify();
  })

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));

  describe('getUsers', () => {
    let returnUsers: User[];
    let getUserUrl: any;

    beforeEach(() => {
      getUserUrl = userService.baseUrl + 'getUsers';
      returnUsers =getTestUsers();
    });

    it('should return expected tasks (called once)', () => {
      userService.getUsers().subscribe(
        users => expect(users).toEqual(returnUsers, 'should return users'),
        fail
      );
      const req = httpTestingController.expectOne(getUserUrl);
      expect(req.request.method).toEqual('GET');
      req.flush(returnUsers);
    });

  });

  describe('updateUser', () => {
    let updateUserUrl: any;
    beforeEach(() => {
      updateUserUrl = userService.baseUrl + 'updateUser';
    });

    it('should update a task and return it', () => {
      let updateUser: User =USERS[0];

      userService.updateUser(updateUser).subscribe(
        user => expect(user).toEqual(updateUser, 'should return the user'),
        fail
      );
      const req = httpTestingController.expectOne(updateUserUrl);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(updateUser);
    });
  });

  describe('addUser', () => {
    let addUserUrl:any;
    beforeEach(() => {
      addUserUrl = userService.baseUrl + 'addUser';
    });

    it('should create a task and return it', () => {

      let addUser=USERS[0];

      userService.addUser(addUser).subscribe(
        user => expect(user).toEqual(addUser, 'should return the user'),
        fail
      );
      const req = httpTestingController.expectOne(addUserUrl);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(addUser);

    });
  });


});
