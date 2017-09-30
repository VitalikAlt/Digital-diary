import { Injectable } from '@angular/core'

@Injectable()
export class UserService {

  private _user: any;

  set(v) {
    this._user = v;
  }

  get user() {
    return this._user;
  }
}

export class Configs {
  static get scheduleLessonsList() {
    return ['1', '2', '3', '4'];
  }

  static get scheduleDaysList() {
    return [['Понедельник', 'Пн.'], ['Вторник', 'Вт.'], ['Среда', 'Ср.'], ['Четверг', 'Чт.'], ['Пятница', 'Пт.']];
  }
}
