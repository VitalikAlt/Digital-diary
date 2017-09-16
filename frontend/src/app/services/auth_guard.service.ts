import { Cookie } from 'ng2-cookies';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './user.service';
import { HttpService } from './http.service';

//TODO need rewiew
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private httpService: HttpService, private userService: UserService, private router: Router) {}

  canActivate(route, state): Promise<boolean> {
    return new Promise((res, rej) => {

      if (!this.userService.user) {
        const cookies = Cookie.getAll();

        if (!cookies.diary_login) {
          this.router.navigate(['/auth']);
          return res(false);
        }

        const user = {
          login: cookies.diary_login,
          password: cookies.diary_password,
          profile_id: cookies.diary_profile_id,
          name: cookies.diary_name
        };

        this.userService.set(user);
      }

      return this.httpService.signIn(this.userService.user.login, this.userService.user.password)
        .subscribe((result) => {
          const accept = result.role === route.url[0].path;

          if (accept)
            this.userService.set(Object.assign(this.userService.user, result));
          else
            this.router.navigate(['/auth']);

          return res(accept);
        }, (error) => {
          return rej(error);
        });
    })
  }

  activate() {
    return new Promise((res, rej) => {

      if (!this.userService.user || !this.userService.user.login) {
        const cookies = Cookie.getAll();

        if (!cookies.stock_login)
          return false;

        const user = {
          login: cookies.diary_login,
          password: cookies.diary_password,
          profile_id: cookies.diary_profile_id,
          name: cookies.diary_name
        };

        this.userService.set(user);
      }

      return this.httpService.signIn(this.userService.user.login, this.userService.user.password)
        .subscribe((result) => {
          this.userService.set(Object.assign(this.userService.user, result));
          return res(true);
        }, (error) => {
          return rej(error);
        });

    })
  }
}
