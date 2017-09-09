import { Component, OnInit, EventEmitter } from '@angular/core';
import {MaterializeAction} from "angular2-materialize";

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

  public teachers: any = [
    {
      name: 'Жуков В. А. 1'
    },{
      name: 'Жуков В. А. 3'
    },{
      name: 'Жуков В. А. 5'
    },{
      name: 'Жуков В. А. 2'
    },{
      name: 'Жуков В. А. 6'
    },{
      name: 'Жуков В. А. 7'
    }
  ];

  constructor() { }

  ngOnInit() { }

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
}
