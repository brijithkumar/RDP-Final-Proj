import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import {Task} from '../model/task.component';
import {ParentTask} from '../model/parentTask.component';
import { catchError,tap } from 'rxjs/operators';
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
export class TaskService {

  baseUrl: String = 'http://localhost:8084/api/';
  errorMessage: String;

  constructor(private http:HttpClient) { }

  addTask(task:Task){
    this.errorMessage='';
    return this.http.post<Task>(this.baseUrl+'addTask',task,httpOptions)
    .pipe(catchError(this.handleError('addTask',task)));
  }

  getParentTasks (): Observable<ParentTask[]> {
    return this.http.get<ParentTask[]>(this.baseUrl+'getParentTasks')
      .pipe(
        catchError(this.handleError('getParentTasks', []))
      );
  }
  getTasks (): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl+'getTasks')
      .pipe(
        catchError(this.handleError('getTasks', []))
      );
  }

  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(this.baseUrl+'task/'+id).pipe(
      catchError(this.handleError<any>(`getTask`)));

  }

  updateTask(task:Task):Observable<Task>{
    this.errorMessage='';
    return this.http.put<Task>(this.baseUrl+'updateTask',task,httpOptions).
      pipe(catchError(this.handleError('updateTask',task)));
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
