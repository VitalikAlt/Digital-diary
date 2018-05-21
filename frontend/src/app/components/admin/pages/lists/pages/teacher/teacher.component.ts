import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { MaterializeAction, toast } from "angular2-materialize";
import { HttpService } from '../../../../../../services/http.service';
import { Md5 } from 'ts-md5/dist/md5';
import { FadeInOutAnimation } from '../../../../../../animations/FadeInOutAnimation';

@Component({
  selector: 'app-admin-lists',
  templateUrl: 'teacher.component.html',
  styleUrls: ['teacher.component.css'],
  animations: [FadeInOutAnimation]
})
export class TeacherListComponent implements OnInit {

  @ViewChild('updateTeacherModal') updateTeacherModal;

  public addTeacherModal = new EventEmitter<string|MaterializeAction>();
  public changePasswordModal = new EventEmitter<string|MaterializeAction>();
  public changeTeacherModal = new EventEmitter<string|MaterializeAction>();
  public deleteTeacherModal = new EventEmitter<string|MaterializeAction>();

  public modalUser;

  public teacherSorts: [string, boolean] = ['name', false];
  public teacherFilters: {name} = {name: ''};
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

  addTeacher() {
    if (!this.modalUser.surname || !this.modalUser.name
      || !this.modalUser.fatherName || !this.modalUser.login || !this.modalUser.password)
      return toast('Заполнены не все поля!', 4000, 'error-toast');

    this.httpService.addTeacher(
      this.modalUser.surname, this.modalUser.name, this.modalUser.fatherName,
      this.modalUser.login, Md5.hashStr(`_${this.modalUser.password}_`).toString()
    )
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

  changePassword() {
    this.httpService.changePassword(this.modalUser.login, Md5.hashStr(`_${this.modalUser.new_password}_`).toString())
      .subscribe((result) => {
        toast('Пароль успешно изменён!', 4000, 'success-toast');
        this.closeChangePasswordModal();
      }, (error) => {
        if (error === "No user with that id!")
          return toast('Преподаватель не найден, обновите страницу!', 4000, 'error-toast');

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
      .subscribe(() => {
        this.ngOnInit();
        this.teachersForDelete = [];
        this.closeDeleteTeacherModal();
      }, (error) => {
        toast('Неизвестная ошибка!', 4000, 'error-toast');
        console.log(error);
      })
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

  changeTeacherSort(type: string) {
    this.changeSort(this.teacherSorts, type);
  }

  changeSort(sort: Object, newType: string) {
    sort[1] = (sort[0] === newType)? !sort[1] : false;
    sort[0] = newType;
  }

  openAddTeacherModal() {
    this.addTeacherModal.emit({action:"modal",params:['open']});
  }

  closeAddTeacherModal() {
    this.addTeacherModal.emit({action:"modal",params:['close']});
  }

  openChangePasswordModal() {
    this.httpService.getTeacherUserData(this.modalUser.id)
      .subscribe((result) => {
        this.changePasswordModal.emit({action:"modal",params:['open']});
        this.modalUser = result;
      }, (error) => {
        if (error === "No user with that id!")
          return toast('Преподаватель не найден, обновите страницу!', 4000, 'error-toast');

        toast('Неизвестная ошибка!', 4000, 'error-toast');
        console.log(error);
      });
  }

  closeChangePasswordModal() {
    this.changePasswordModal.emit({action:"modal",params:['close']});
  }

  openDeleteTeacherModal() {
    this.deleteTeacherModal.emit({action:"modal",params:['open']});
  }

  closeDeleteTeacherModal() {
    this.deleteTeacherModal.emit({action:"modal",params:['close']});
  }
}
