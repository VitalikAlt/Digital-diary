import {Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';
import { toast } from "angular2-materialize";
import {HttpService} from '../../services/http.service';
import {Md5} from 'ts-md5/dist/md5';
import {Cookie} from 'ng2-cookies';
import {UserService, Configs} from '../../services/user.service';
import {AuthGuard} from '../../services/auth_guard.service';
import {Preloader} from '../../services/preloader.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  public incorrectInput: boolean;

  constructor(private router: Router, private httpService: HttpService, public preloader: Preloader,
              private userService: UserService, private authGuard: AuthGuard) {
  }

  async ngOnInit() {
    this.incorrectInput = false;
    (await this.authGuard.activate()) ? this.route(this.userService.user) : null;
  }

  enter(authForm: NgForm) {
    const password = Md5.hashStr(`_${authForm.value.password}_`).toString();
    this.httpService.signIn(authForm.value.login, password)
      .subscribe((result) => {
        this.route({login: authForm.value.login, password, role: result.role, remember: authForm.value.remember});
      }, (error) => {
        toast('Неверное имя пользователя или пароль!', 4000, 'error-toast');
      })
  }

  route(user) {
    if (Configs.allowedRoles.indexOf(user.role) !== -1) {
      this.saveUserData(user);
      this.router.navigate([`/${user.role}`]);
      return;
    }

    toast('Неизвестная роль! Обратитесь к администратору!', 4000, 'error-toast');
  }

  saveUserData(user) {
    this.userService.set(user);

    if (!user.remember)
      return;

    Cookie.set('diary_login', user.login);
    Cookie.set('diary_password', user.password);
    Cookie.set('diary_role', user.role);

    if (user.profile_id)
      Cookie.set('diary_profile_id', user.profile_id);
  }
}
