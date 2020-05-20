import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    // public currentUser: Observable<User>;

    private _currentUser;
    public get currentUser() {
        return this._currentUser;
    }
    public set currentUser(value) {
        this._currentUser = value;
    }
    

    constructor(private http: HttpClient) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
        console.log('currentUser', this.currentUser)
        // this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        // this.currentUser = this.currentUserSubject.asObservable();
    }

    // public get currentUserValue(): User {
    //     return this.currentUserSubject.value;
    // }

    // login(username, password) {
    //     return this.http.post<any>(`/users/authenticate`, { username, password })
    //         .pipe(map(user => {
    //             // store user details and jwt token in local storage to keep user logged in between page refreshes
    //             localStorage.setItem('currentUser', JSON.stringify(user));
    //             this.currentUserSubject.next(user);
    //             return user;
    //         }));
    // }
    

    login(loginForm) {
        return this.http.post<any>(`http://localhost:1234/authenticate`, loginForm)
            // .pipe(map(user => {
            //     console.log(user)
            //     // store user details and jwt token in local storage to keep user logged in between page refreshes
            //     localStorage.setItem('currentUser', JSON.stringify(loginForm.username));
            //     this.currentUserSubject.next(loginForm.username);
            //     console.log(user)
            //     return loginForm.username;
            // }));
    }

    register(user: User) {
        return this.http.post<any>(`/users/register`, user)
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                // localStorage.setItem('currentUser', JSON.stringify(user));
                // this.currentUserSubject.next(user);
                console.log('brah', user)
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUser = null;
        //this.currentUserSubject.next(null);
    }
}