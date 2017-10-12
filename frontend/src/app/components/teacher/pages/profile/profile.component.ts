import { Component, OnInit } from '@angular/core';
import { toast } from "angular2-materialize";
import { Cookie } from 'ng2-cookies';
import { HttpService } from '../../../../services/http.service';
import { UserService } from '../../../../services/user.service';
import { FadeInOutAnimation } from '../../../../animations/FadeInOutAnimation';

@Component({
  selector: 'app-teacher-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.css'],
  animations: [FadeInOutAnimation],
  host: { '[@FadeInOutAnimation]': 'true' }
})
export class TeacherProfileComponent implements OnInit {

  public teacher: any;

  constructor(private httpService: HttpService, private userService: UserService) { }

  ngOnInit() {
    this.teacher = {};
    const user = this.userService.user;

    this.httpService.getTeacherProfile(user.profile_id)
      .subscribe((teacher) => {
        this.teacher = teacher;
        this.updateUserData();
      }, (error) => {
        if (error === "No user with that id!")
          return toast('Преподаватель не найден, обновите страницу!', 4000, 'error-toast');

        toast('Неизвестная ошибка!', 4000, 'error-toast');
        console.log(error);
      })
  }

  updateUserData() {
    this.userService.user.name = `${this.teacher.surname} ${this.teacher.name[0]}. ${this.teacher.father_name[0]}.`;
    Cookie.set('diary_name', this.userService.user.name);
  }
}
