import { Injectable } from '@angular/core';
import {User} from '../model/user.component';
import { Observable, of } from 'rxjs';
import {RequestOptions,Headers} from '@angular/http';
import { HttpErrorResponse,HttpHeaders,HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError'; 
import { catchError } from 'rxjs/operators';


const  httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};


@Injectable()
export class UserService {

  baseUrl: String = 'http://localhost:8084/api/';
  errorMessage: String;

  constructor(private http:HttpClient) { }

addUser(user:User):Observable<User>{
  this.errorMessage='';
  return this.http.post<User>(this.baseUrl+'addUser',user,httpOptions)
  .pipe(catchError(this.handleError('addUser',user)));
}

getUsers (): Observable<User[]> {
  return this.http.get<User[]>(this.baseUrl+'getUsers')
    .pipe(
      catchError(this.handleError('getUsers', []))
    );
}

updateUser(user:User):Observable<User>{
  this.errorMessage='';
  return this.http.put<User>(this.baseUrl+'updateUser',user,httpOptions).
    pipe(catchError(this.handleError('updateUser',user)));
}

deleteUser(id:number):Observable<{}>{
  this.errorMessage=''; 
  return this.http.delete(this.baseUrl+'deleteUser/'+id,httpOptions).
    pipe(catchError(this.handleError('deleteUser')));
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
