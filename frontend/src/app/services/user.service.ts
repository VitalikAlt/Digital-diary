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
    return ['8:30 - 10:00', '10:15 - 11:45', '12:30 - 14:00', '14:15 - 15:45'];
  }

  static get scheduleDaysList() {
    return [['Понедельник', 'Пн.'], ['Вторник', 'Вт.'], ['Среда', 'Ср.'], ['Четверг', 'Чт.'], ['Пятница', 'Пт.']];
  }

  static get allowedRoles() {
    return ['student', 'teacher', 'admin'];
  }
}
