import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-teacher',
  templateUrl: 'teacher.component.html',
  styleUrls: ['teacher.component.css']
})
export class TeacherComponent implements OnInit {

  constructor(public userService: UserService, private router: Router) { }

  ngOnInit() {}

  deleteAllCookies() {
    this.userService.set({});
    Cookie.deleteAll();
    console.log(Cookie.getAll());
    this.router.navigate(['/auth']);
  }
}
