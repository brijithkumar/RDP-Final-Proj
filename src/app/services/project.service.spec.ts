import { TestBed } from '@angular/core/testing';
import { ProjectService } from './project.service';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import {HttpTestingController,HttpClientTestingModule} from '@angular/common/http/testing';

describe('ProjectService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let projectService: ProjectService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProjectService]
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    projectService = TestBed.get(ProjectService);
  });

  it('should be created', () => {
    const service: ProjectService = TestBed.get(ProjectService);
    expect(service).toBeTruthy();
  });
});
