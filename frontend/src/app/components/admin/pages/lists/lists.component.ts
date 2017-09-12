import { Component, OnInit, EventEmitter } from '@angular/core';
import { MaterializeAction, toast } from "angular2-materialize";
import { HttpService } from '../../../../services/http.service';

@Component({
  selector: 'app-admin-lists',
  templateUrl: 'lists.component.html',
  styleUrls: ['lists.component.css']
})
export class AdminListsComponent implements OnInit {

  public addStudentModal = new EventEmitter<string|MaterializeAction>();
  public addTeacherModal = new EventEmitter<string|MaterializeAction>();
  public changePasswordModal = new EventEmitter<string|MaterializeAction>();
  public changeStudentModal = new EventEmitter<string|MaterializeAction>();
  public changeTeacherModal = new EventEmitter<string|MaterializeAction>();
  public deleteStudentModal = new EventEmitter<string|MaterializeAction>();
  public deleteTeacherModal = new EventEmitter<string|MaterializeAction>();

  public studentState: boolean = true;
  public modalUser;

  public studentSorts: [string, boolean] = ['name', false];
  public studentFilters: Object = {name: '', course: '', squad: ''};
  public studentsForDelete: Array<Object> = [];

  public students: any = [{
    name: 'Жуков В. А.',
    course: 1,
    squad: 1
  },{
    name: 'Жуков В. А.',
    course: 22,
    squad: 22
  },{
    name: 'Жуков В. А.',
    course: 3,
    squad: 3
  },{
    name: 'Жуков В. А.',
    course: 2,
    squad: 2
  },{
    name: 'Жуков В. А.',
    course: 5,
    squad: 5
  }];

  public teacherSorts: [string, boolean] = ['name', false];
  public teacherFilters: Object = {name: ''};
  public teachersForDelete: Array<Object> = [];

  public teachers: Array<Object> = [];

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.modalUser = {};
    this.httpService.getTeacherList()
      .subscribe((teachers) => {
        this.teachers = teachers;
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
      this.modalUser.surname, this.modalUser.name, this.modalUser.fatherName, this.modalUser.login, this.modalUser.password)
      .subscribe(() => {
        this.students.push(this.modalUser);
        toast('Студент добавлен!', 4000, 'success-toast');
        this.closeAddStudentModal();
      }, (error) => {
        if (error === 'User already exist!')
          return toast('Студент уже существует!', 4000, 'error-toast');

        toast('Неизвестная ошибка!', 4000, 'error-toast');
        console.log(error);
      })
  }

  addTeacher() {
    if (!this.modalUser.surname || !this.modalUser.name
      || !this.modalUser.fatherName || !this.modalUser.login || !this.modalUser.password)
      return toast('Заполнены не все поля!', 4000, 'error-toast');

    this.httpService.addTeacher(this.modalUser.surname, this.modalUser.name, this.modalUser.fatherName, this.modalUser.login, this.modalUser.password)
      .subscribe((id) => {
        this.teachers.push({
          id: id,
          name: `${this.modalUser.surname} ${this.modalUser.name[0]}. ${this.modalUser.fatherName[0]}.`
        });

        toast('Преподаватель добавлен!', 4000, 'success-toast');
        this.closeAddTeacherModal();
      }, (error) => {
        if (error === 'User already exist!')
          return toast('Преподаватель уже существует!', 4000, 'error-toast');

        toast('Неизвестная ошибка!', 4000, 'error-toast');
        console.log(error);
      })
  }

  deleteTeachers() {
    const ids = [];

    for (let i = 0; i < this.teachersForDelete.length; i++) {
      ids.push(this.teachersForDelete[i]['id']);
    }

    this.httpService.deleteTeachers(ids)
      .subscribe((list) => {
        this.teachers = list;
        this.teachersForDelete = [];
        this.closeDeleteTeacherModal();
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

  setDeletedTeacher(teacher) {
    this.teachersForDelete = [];
    this.teachersForDelete.push(teacher);
  }

  changeDeletedTeachers(teacher) {
    const index = this.teachersForDelete.indexOf(teacher);

    if (index === -1)
      this.teachersForDelete.push(teacher);
    else
      this.teachersForDelete.splice(index, 1);
  }

  changeStudentSort(type: string) {
    this.changeSort(this.studentSorts, type);
  }

  changeTeacherSort(type: string) {
    this.changeSort(this.teacherSorts, type);
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

  openAddTeacherModal() {
    this.addTeacherModal.emit({action:"modal",params:['open']});
  }

  closeAddTeacherModal() {
    this.addTeacherModal.emit({action:"modal",params:['close']});
  }

  openChangePasswordModal() {
    this.changePasswordModal.emit({action:"modal",params:['open']});
  }

  closeChangePasswordModal() {
    this.changePasswordModal.emit({action:"modal",params:['close']});
  }

  openChangeStudentModal() {
    this.changeStudentModal.emit({action:"modal",params:['open']});
  }

  closeChangeStudentModal() {
    this.changeStudentModal.emit({action:"modal",params:['close']});
  }

  openChangeTeacherModal() {
    this.changeTeacherModal.emit({action:"modal",params:['open']});
  }

  closeChangeTeacherModal() {
    this.changeTeacherModal.emit({action:"modal",params:['close']});
  }

  openDeleteStudentModal() {
    this.deleteStudentModal.emit({action:"modal",params:['open']});
  }

  closeDeleteStudentModal() {
    this.deleteStudentModal.emit({action:"modal",params:['close']});
  }

  openDeleteTeacherModal() {
    this.deleteTeacherModal.emit({action:"modal",params:['open']});
  }

  closeDeleteTeacherModal() {
    this.deleteTeacherModal.emit({action:"modal",params:['close']});
  }
}
