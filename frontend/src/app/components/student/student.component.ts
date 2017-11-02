import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-student',
  templateUrl: 'student.component.html',
  styleUrls: ['student.component.css']
})
export class StudentComponent implements OnInit {

  public photoUrl: string = '';
  public defaultPhotoUrl: string = '../../../../../assets/data/photo/student/default.png';

  constructor(public userService: UserService, private router: Router) { }

  ngOnInit() {
    this.photoUrl = `/assets/data/photo/student/${this.userService.user.profile_id}.jpg`;
  }

  deleteAllCookies() {
    this.userService.set({});
    Cookie.deleteAll();
    console.log(Cookie.getAll());
    this.router.navigate(['/auth']);
  }
}
