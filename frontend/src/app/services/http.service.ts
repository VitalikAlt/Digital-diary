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

  getStudentList(): Observable<Array<Object>> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let url = this.baseUrl + 'student/list';

    return this.http
      .post(url, JSON.stringify({}), options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getStudentProfile(id): Observable<Object> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let url = this.baseUrl + 'student/get_profile';

    return this.http
      .post(url, JSON.stringify({id}), options)
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

  updateStudentProfile(student): Observable<string> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let url = this.baseUrl + 'student/update';

    return this.http
      .post(url, JSON.stringify({id: student.id, data: student}), options)
      .map(this.extractData)
      .catch(this.handleError);
  }






  getTeacherProfile(id): Observable<Object> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let url = this.baseUrl + 'teacher/get_profile';

    return this.http
      .post(url, JSON.stringify({id}), options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateTeacherProfile(teacher): Observable<string> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let url = this.baseUrl + 'teacher/update';

    return this.http
      .post(url, JSON.stringify({id: teacher.id, data: teacher}), options)
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

  getSubjectList(): Observable<Array<Object>> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let url = this.baseUrl + 'discipline/list';

    return this.http
      .post(url, JSON.stringify({}), options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  addSubject(name, teacher_id): Observable<string> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let url = this.baseUrl + 'discipline/add';

    return this.http
      .post(url, JSON.stringify({name, teacher_id}), options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateSubjectGroups(discipline_id, assigned_group_ids): Observable<string> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let url = this.baseUrl + 'discipline/update';

    return this.http
      .post(url, JSON.stringify({discipline_id, assigned_group_ids}), options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  deleteSubject(id): Observable<string> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let url = this.baseUrl + 'discipline/delete';

    return this.http
      .post(url, JSON.stringify({id}), options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getGroupsByDisciplineId(discipline_id): Observable<Array<Object>> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let url = this.baseUrl + 'group/get';

    return this.http
      .post(url, JSON.stringify({discipline_id}), options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getGroupList(): Observable<Array<Object>> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let url = this.baseUrl + 'group/list';

    return this.http
      .post(url, JSON.stringify({}), options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  upGroups(): Observable<Boolean> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let url = this.baseUrl + 'group/up';

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
