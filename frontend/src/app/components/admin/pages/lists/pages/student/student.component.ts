import { Component, OnInit, EventEmitter } from '@angular/core';
import { MaterializeAction, toast } from "angular2-materialize";
import { HttpService } from '../../../../../../services/http.service';
import {Md5} from 'ts-md5/dist/md5';

@Component({
  selector: 'app-admin-lists',
  templateUrl: 'student.component.html',
  styleUrls: ['student.component.css']
})
export class StudentListComponent implements OnInit {

  public addStudentModal = new EventEmitter<string|MaterializeAction>();
  public changePasswordModal = new EventEmitter<string|MaterializeAction>();
  public changeStudentModal = new EventEmitter<string|MaterializeAction>();
  public deleteStudentModal = new EventEmitter<string|MaterializeAction>();

  public modalUser;

  public studentSorts: [string, boolean] = ['name', false];
  public studentFilters: {name, course, squad} = {name: '', course: '', squad: ''};
  public studentsForDelete: Array<Object> = [];

  public students: Array<Object> = [];

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.modalUser = {};

    this.httpService.getStudentList()
      .subscribe((students) => {
        this.students = students;
      }, (error) => {
        toast('Неизвестная ошибка!', 4000, 'error-toast');
        console.log(error);
      })
  }

  addStudent() {
    if (!this.modalUser.course || !this.modalUser.squad || !this.modalUser.surname || !this.modalUser.name
      || !this.modalUser.fatherName || !this.modalUser.login || !this.modalUser.password)
      return toast('Заполнены не все поля!', 4000, 'error-toast');

    this.httpService.addStudent(this.modalUser.course, this.modalUser.squad,
      this.modalUser.surname, this.modalUser.name, this.modalUser.fatherName, this.modalUser.login, Md5.hashStr(this.modalUser.password).toString())
      .subscribe((id) => {
        this.students.push({
          id: id,
          name: `${this.modalUser.surname} ${this.modalUser.name[0]}. ${this.modalUser.fatherName[0]}.`,
          course: this.modalUser.course,
          squad: this.modalUser.squad
        });

        toast('Студент добавлен!', 4000, 'success-toast');
        this.closeAddStudentModal();
      }, (error) => {
        if (error === 'User already exist!')
          return toast('Студент уже существует!', 4000, 'error-toast');

        toast('Неизвестная ошибка!', 4000, 'error-toast');
        console.log(error);
      })
  }

  changePassword() {
    this.httpService.changePassword(this.modalUser.id, Md5.hashStr(this.modalUser.new_password).toString())
      .subscribe((result) => {
        toast('Студент успешно изменён!', 4000, 'success-toast');
        this.closeChangePasswordModal();
      }, (error) => {
        if (error === "No user with that id!")
          return toast('Студент не найден, обновите страницу!', 4000, 'error-toast');

        toast('Неизвестная ошибка!', 4000, 'error-toast');
        console.log(error);
      })
  }

  updateStudent() {
    const birthDate = this.modalUser.birth_date.split('/');
    this.modalUser.birth_date = new Date(birthDate[2], birthDate[1], birthDate[0]);
    this.httpService.updateStudentProfile(this.modalUser)
      .subscribe(() => {
        toast('Студент обновлён!', 4000, 'success-toast');
        this.closeChangeStudentModal();
      }, (error) => {
        if (error === "No user with that id!")
          return toast('Студент не найден, обновите страницу!', 4000, 'error-toast');

        toast('Неизвестная ошибка!', 4000, 'error-toast');
        console.log(error);
      })
  }

  deleteStudents() {
    const ids = [];

    for (let i = 0; i < this.studentsForDelete.length; i++) {
      ids.push(this.studentsForDelete[i]['id']);
    }

    this.httpService.deleteStudents(ids).subscribe(() => {
        this.studentsForDelete = [];
        this.ngOnInit();
        toast('Список студентов обновлён!', 4000, 'success-toast');
        this.closeDeleteStudentModal();
      }, (error) => {
        toast('Неизвестная ошибка!', 4000, 'error-toast');
        console.log(error);
      })
  }

  setDeletedStudent(student) {
    this.studentsForDelete = [];
    this.studentsForDelete.push(student);
  }

  changeDeletedStudents(student) {
    const index = this.studentsForDelete.indexOf(student);

    if (index === -1)
      this.studentsForDelete.push(student);
    else
      this.studentsForDelete.splice(index, 1);
  }

  changeStudentSort(type: string) {
    this.changeSort(this.studentSorts, type);
  }

  changeSort(sort: Object, newType: string) {
    sort[1] = (sort[0] === newType)? !sort[1] : false;
    sort[0] = newType;
  }

  openAddStudentModal() {
    this.addStudentModal.emit({action:"modal",params:['open']});
  }

  closeAddStudentModal() {
    this.addStudentModal.emit({action:"modal",params:['close']});
  }

  openChangePasswordModal() {
    this.httpService.getStudentUserData(this.modalUser.id)
      .subscribe((result) => {
        this.changePasswordModal.emit({action:"modal",params:['open']});
        this.modalUser = result;
      }, (error) => {
        if (error === "No user with that id!")
          return toast('Студент не найден, обновите страницу!', 4000, 'error-toast');

        toast('Неизвестная ошибка!', 4000, 'error-toast');
        console.log(error);
      });
  }

  closeChangePasswordModal() {
    this.changePasswordModal.emit({action:"modal",params:['close']});
  }

  openChangeStudentModal() {
    this.httpService.getStudentProfile(this.modalUser.id)
      .subscribe((result) => {
        this.changeStudentModal.emit({action:"modal",params:['open']});

        result['id'] = this.modalUser.id;
        this.modalUser = result;
      }, (error) => {
        if (error === "No user with that id!")
          return toast('Студент не найден, обновите страницу!', 4000, 'error-toast');

        toast('Неизвестная ошибка!', 4000, 'error-toast');
        console.log(error);
      })
  }

  closeChangeStudentModal() {
    this.changeStudentModal.emit({action:"modal",params:['close']});
  }

  openDeleteStudentModal() {
    this.deleteStudentModal.emit({action:"modal",params:['open']});
  }

  closeDeleteStudentModal() {
    this.deleteStudentModal.emit({action:"modal",params:['close']});
  }
}
