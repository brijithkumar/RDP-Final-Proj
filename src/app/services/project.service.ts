import { Injectable } from '@angular/core';
import {RequestOptions,Headers } from '@angular/http';
import {HttpClient,HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import {Project} from '../model/project.component';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

const  httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http:HttpClient) { }

  baseUrl: String = 'http://localhost:8084/api/';
  errorMessage: String;

  addProject(project:Project){
    this.errorMessage='';
    return this.http.post<Project>(this.baseUrl+'addProject',project,httpOptions)
    .pipe(catchError(this.handleError('addProject',project)));
  }

  updateProject(project:Project):Observable<Project>{
    this.errorMessage='';
    return this.http.put<Project>(this.baseUrl+'updateProject',project,httpOptions).
      pipe(catchError(this.handleError('updateProject',project)));
  }

  getProjects (): Observable<Project[]> {
    return this.http.get<Project[]>(this.baseUrl+'getProjects')
      .pipe(
        catchError(this.handleError('getProjects', []))
      );
  }

  private handleError<T> (operation = 'operation', result = {} as T) {
    return (error: HttpErrorResponse): Observable<T> => {
      this.errorMessage='error';
      const message = (error.error instanceof ErrorEvent) ?
        error.error.message : `server returned code ${error.status} with body "${error.error}"`;
        return of( result );
    }
  }


}
