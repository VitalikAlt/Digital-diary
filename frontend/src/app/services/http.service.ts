import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { UserService } from './user.service';
import { toast } from "angular2-materialize";
import { Preloader } from './preloader.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class HttpService {

  //85.142.148.182
  private baseUrl = '/';

  constructor(private httpClient: HttpClient, private userService: UserService) { }

  private sendRequest(url, body): Observable<any> {
    if (url !== 'sign_in' && url !== 'reset_admin') {
      const user = this.userService.user;

      if (!user.login || !user.password) {
        toast('Критическая ошибка! Перезагрузите страницу!', 4000, 'error-toast');
        return Observable.throw('UserService critical error!');
      }


      Object.assign(body, {sender: {login: user.login, password: user.password}});
    }

    Preloader.turnOn();
    return this.httpClient.post(this.baseUrl + url, body)
      .map((value) => {
        Preloader.turnOf();
        return value;
      })
      .catch(this.handleError);
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let error;
    Preloader.turnOf();

    try {
      error = JSON.parse(errorResponse.error).message || errorResponse.error;
    } catch (err) {
      error = errorResponse.statusText;
    }

    return Observable.throw(error);
  }






  signIn(login: string, password: string): Observable<any> {
    return this.sendRequest('sign_in', {login, password});
  }






  getStudentList(): Observable<Array<Object>> {
    return this.sendRequest('student/list',{});
  }

  getStudentProfile(id: string): Observable<Object> {
    return this.sendRequest('student/get_profile',{id});
  }

  addStudent(course: number, squad: number, surname: string, name: string, father_name: string, login: string, password: string): Observable<string> {
    return this.sendRequest('student/add',{course, squad, surname, name, father_name, login, password});
  }

  updateStudentProfile(student): Observable<string> {
    return this.sendRequest('student/update',{id: student.id, data: student});
  }

  deleteStudents(ids: Array<string>): Observable<String> {
    return this.sendRequest('student/delete',{ids});
  }







  getTeacherList(): Observable<Array<Object>> {
    return this.sendRequest('teacher/list',{});
  }

  getTeacherProfile(id): Observable<Object> {
    return this.sendRequest('teacher/get_profile',{id});
  }

  updateTeacherProfile(teacher): Observable<string> {
    return this.sendRequest('teacher/update',{id: teacher.id, data: teacher});
  }

  addTeacher(surname, name, father_name, login, password): Observable<string> {
    return this.sendRequest('teacher/add',{surname, name, father_name, login, password});
  }

  deleteTeachers(ids): Observable<String> {
    return this.sendRequest('teacher/delete',{ids});
  }






  getSubjectsByTeacher(teacher_id: string): Observable<Array<Object>> {
    return this.sendRequest('discipline/get',{teacher_id});
  }

  getSubjectList(): Observable<Array<Object>> {
    return this.sendRequest('discipline/list',{});
  }

  addSubject(name, teacher_id): Observable<string> {
    return this.sendRequest('discipline/add',{name, teacher_id});
  }

  updateSubjectGroups(discipline_id, assigned_group_ids): Observable<string> {
    return this.sendRequest('discipline/update',{discipline_id, assigned_group_ids});
  }

  deleteSubject(id): Observable<string> {
    return this.sendRequest('discipline/delete',{id});
  }






  getGroupsByDisciplineId(discipline_id): Observable<Array<Object>> {
    return this.sendRequest('group/get',{discipline_id});
  }

  getAssignedGroups(discipline_id?: string): Observable<{squads, courses, ids}> {
    return this.sendRequest('group/get_assigned',{discipline_id});
  }

  getGroupList(): Observable<Array<Object>> {
    return this.sendRequest('group/list',{});
  }

  upGroups(): Observable<Boolean> {
    return this.sendRequest('group/up',{});
  }






  getMarks(discipline_id: string, group_id: string): Observable<Object> {
    return this.sendRequest('mark/get',{discipline_id, group_id});
  }

  getStudentMarks(student_id: string): Observable<Object> {
    return this.sendRequest('mark/get_student', {student_id});
  }

  updateMarks(discipline_id: string, marks: Object): Observable<boolean> {
    return this.sendRequest('mark/update',{discipline_id, marks});
  }






  getSchedule(group_id: string): Observable<Object> {
    return this.sendRequest('schedule/get',{group_id});
  }

  getScheduleTeacher(teacher_id: string): Observable<Object> {
    return this.sendRequest('schedule/get_teacher',{teacher_id});
  }

  updateScheduleCell(params): Observable<boolean> {
    return this.sendRequest('schedule/update', params);
  }

  deleteScheduleCell(ids: Array<string>): Observable<boolean> {
    return this.sendRequest('schedule/delete',{ids});
  }






  getStudentMisses(student_id: string): Observable<Array<Object>> {
    return this.sendRequest('misses/get_student',{student_id});
  }

  getMisses(date: Date, group_id: string): Observable<Object> {
    return this.sendRequest('misses/get_by_date',{date, group_id});
  }

  updateMissesCell(student_id: string, date: Date,lesson_number: number, reason: string, id?: string): Observable<boolean> {
    return this.sendRequest('misses/update', {id, student_id, date, lesson_number, reason});
  }

  deleteMissesCell(id: string): Observable<boolean> {
    return this.sendRequest('misses/delete', {id});
  }






  getStudentUserData(student_id) {
    return this.sendRequest('user/get', {student_id});
  }

  getTeacherUserData(teacher_id) {
    return this.sendRequest('user/get', {teacher_id});
  }

  changePassword(login: string, new_password: string, old_password?: string): Observable<string> {
    const params = old_password? {login, new_password, old_password} : {login, new_password};
    return this.sendRequest('user/change_password', params);
  }

  uploadUserPhoto(files: Array<File>, id, role) {
    return new Promise((resolve, reject) => {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();
      for(var i = 0; i < files.length; i++) {
        formData.append("uploads[]", files[i], files[i].name);
      }
      formData.append("id", id);
      formData.append("role", role);
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      }
      xhr.open("POST", this.baseUrl+'user/photo_upload', true);
      xhr.send(formData);
    });
  }






  resetAdmin(login: string, password: string, secret_key: string): Observable<string> {
    return this.sendRequest('reset_admin', {login, password, secret_key});
  }
}
