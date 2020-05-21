import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;

    private _currentUser;
    public get currentUser() {
        return this._currentUser;
    }
    public set currentUser(value) {
        this._currentUser = value;
    }

    constructor(private http: HttpClient) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
        // console.log('currentUser', this.currentUser)
    }


    login(loginForm) {
        return this.http.post<any>(`http://localhost:1234/authenticate`, loginForm)
    }

    register(user: User) {
        return this.http.post<any>(`/users/register`, user)
            .pipe(map(user => {
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUser = null;
    }
}