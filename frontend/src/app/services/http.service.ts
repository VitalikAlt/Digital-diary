import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class HttpService {

  private baseUrl = 'http://localhost:8080/';

  constructor(private http: Http) { }

  private extractData (res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError(error: Response | any) {
    let errMsg: string;

    if (error instanceof Response) {
      const err = error.json() || '';
      errMsg = (typeof err === 'object')? err.message : err;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }

    return Observable.throw(errMsg);
  }

  signIn(login: string, password: string): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let url = this.baseUrl + 'sign_in';

    return this.http
      .post(url, JSON.stringify({login, password}), options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  signUp(login: string, password: string, user: {login, password, role}): Observable<string> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let url = this.baseUrl + 'sign_up';

    return this.http
      .post(url, JSON.stringify({login, password, user}), options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  addStudent(course: string, squad: string, surname: string, name: string, father_name: string, login: string, password: string): Observable<string> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let url = this.baseUrl + 'student/add';

    return this.http
      .post(url, JSON.stringify({course, squad, surname, name, father_name, login, password}), options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  addTeacher(surname, name, father_name, login, password): Observable<string> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let url = this.baseUrl + 'teacher/add';

    return this.http
      .post(url, JSON.stringify({surname, name, father_name, login, password}), options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  deleteTeachers(ids): Observable<Array<Object>> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let url = this.baseUrl + 'teacher/delete';

    return this.http
      .post(url, JSON.stringify({ids}), options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getTeacherList(): Observable<Array<Object>> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let url = this.baseUrl + 'teacher/list';

    return this.http
      .post(url, JSON.stringify({}), options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  resetAdmin(secretKey: string, login: string, password: string): Observable<string> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let url = this.baseUrl + 'reset_admin';

    return this.http
      .post(url, JSON.stringify({login, password, secret_key: secretKey}), options)
      .map(this.extractData)
      .catch(this.handleError);
  }
}
