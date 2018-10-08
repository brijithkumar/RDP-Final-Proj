import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../model/user.component';
import { UserService } from '../services/user.service';
import { getTestUsers } from './user-test-data';
import { asyncData } from './async-observable-helpers';


@Injectable({
    providedIn: 'root'
})
export class MockUserService extends UserService {
    constructor() {
        super(null);
    }
    users: User[] = getTestUsers();

    lastResult: Observable<any>;

    getUsers(): Observable<User[]> {
        return this.lastResult = asyncData(this.users);   
    }

    getUser(id: number): Observable<User> {
        let user = this.users.find(h => h.userId === id);
        return this.lastResult = asyncData(user);

    }

    addUser(user: User): Observable<any> {
        return this.lastResult = this.getUser(user.userId).pipe(
            map(h => {
                if (h) {
                    this.errorMessage='';
                    return Object.assign(h, user);
                }
                return Object.assign(null);
            })
        );
    }

    updateUser(user: User): Observable<any> {
        return this.lastResult = this.getUser(user.userId).pipe(
            map(h => {
                if (h) {
                    this.errorMessage='';
                    return Object.assign(h, user);
                }
                return Object.assign(null);
            })
        );
    }

    deleteUser(id: number): Observable<{}> {
        return this.lastResult = this.getUser(id).pipe(
            map(h => {
                if (h) {
                    this.errorMessage='';
                    return ''
                }
                return Object.assign({'error' : 'error' });
            })
        );
    }
}