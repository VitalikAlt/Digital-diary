import { Component, OnInit } from '@angular/core';
import { toast } from "angular2-materialize";
import {Md5} from 'ts-md5/dist/md5';
import { Cookie } from 'ng2-cookies';
import { HttpService } from '../../../../services/http.service';
import { UserService } from '../../../../services/user.service';
import { FadeInOutAnimation } from '../../../../animations/FadeInOutAnimation';

@Component({
  selector: 'app-teacher-settings',
  templateUrl: 'settings.component.html',
  styleUrls: ['settings.component.css'],
  animations: [FadeInOutAnimation]
})
export class TeacherSettingsComponent implements OnInit {

  public password: {old, new, newRepeat} = {old: '', new: '', newRepeat: ''};

  constructor(private httpService: HttpService, private userService: UserService) { }

  ngOnInit() {  }

  changePassword() {
    if (!this.password.old || !this.password.new)
      return toast('Все поля должны быть заполнены!', 4000, 'error-toast');

    if (this.password.new !== this.password.newRepeat)
      return toast('Не совпадение новых паролей!', 4000, 'error-toast');

    const oldPassword = Md5.hashStr(this.password.old).toString();
    const newPassword = Md5.hashStr(this.password.new).toString();

    if (this.userService.user.password !== oldPassword)
      return toast('Текущий пароль не верен!', 4000, 'error-toast');

    this.httpService.changePassword(this.userService.user.login, newPassword, oldPassword)
      .subscribe(() => {
        toast('Пароль успешно изменён!', 4000, 'success-toast');
        this.updateUserData(newPassword);
      }, (error) => {
        toast('Неизвестная ошибка!', 4000, 'error-toast');
        console.log(error);
      })
  }

  updateUserData(password) {
    this.userService.user.password = password;

    if (Cookie.get('diary_login')) {
      Cookie.delete('diary_password');
      Cookie.set('diary_password', password);
    }
  }
}
