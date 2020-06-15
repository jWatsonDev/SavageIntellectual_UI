import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Discipline } from '../models/discipline';
import { Status } from '../models/status';
import { forkJoin, Observable } from 'rxjs';
import { API_ENDPOINT } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private _http: HttpClient,
    private _authService: AuthenticationService) { }

  createDiscipline(discipline: Discipline) {
    discipline.username = this._authService.currentUser.username;
    return this._http.post<any>(`${API_ENDPOINT}/disciplines`, discipline);
  }

  getDisciplinesByUsername() {
    return this._http.get<any>(`${API_ENDPOINT}/disciplines/users/${this._authService.currentUser.username}`);
  }

  saveStatus(status: Status) {
    status.username = this._authService.currentUser.username;
    return this._http.post<any>(`${API_ENDPOINT}/statuses`, status);
  }

  getStatusesByUsernameAndDate(date) {
    return this._http.get<any>(`${API_ENDPOINT}/statuses/users/${this._authService.currentUser.username}/date/${date}`);
  }

  getProgressByUsernameAndDisciplineId(disciplineId) {
    console.log(disciplineId);
    return this._http.get<any>(`${API_ENDPOINT}/progresses/users/${this._authService.currentUser.username}/disciplineId/${disciplineId}`);
  }

  /**
     * Calls TODO
     * @param assets: will return observable data
     */
  getProgresses(disciplines: Array<Discipline>): Observable<any> {
    let observableBatch = [];
    disciplines.forEach((d: Discipline) => {
      const url = `${API_ENDPOINT}/progresses/users/${this._authService.currentUser.username}/disciplineId/${d.id}`

      //console.log(url);
      observableBatch.push(this._http.get(url))
    });

    return forkJoin(observableBatch);
  }
}
