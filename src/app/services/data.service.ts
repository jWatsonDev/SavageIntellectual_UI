import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Discipline } from '../models/discipline';
import { Status } from '../models/status';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private _http: HttpClient,
    private _authService: AuthenticationService) { }

  createDiscipline(discipline: Discipline) {
    discipline.username = this._authService.currentUser.username;
    return this._http.post<any>(`http://localhost:1234/disciplines`, discipline);
  }

  getDisciplinesByUsername() {
    return this._http.get<any>(`http://localhost:1234/disciplines/users/${this._authService.currentUser.username}`);
  }

  saveStatus(status: Status) {
    status.username = this._authService.currentUser.username;
    return this._http.post<any>(`http://localhost:1234/statuses`, status);
  }

  getStatusesByUsernameAndDate(date) {
    return this._http.get<any>(`http://localhost:1234/statuses/users/${this._authService.currentUser.username}/date/${date}`);
  }
}
