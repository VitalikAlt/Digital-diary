import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import {Preloader} from "../../services/preloader.service";

@Component({
  selector: 'app-teacher',
  templateUrl: 'teacher.component.html',
  styleUrls: ['teacher.component.css']
})
export class TeacherComponent implements OnInit {

  public photoUrl: string = '';
  public defaultPhotoUrl: string = '../../../../../assets/data/photo/teacher/default.png';

  constructor(public userService: UserService, private router: Router,
              public preloader: Preloader, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.photoUrl = `/assets/data/photo/teacher/${this.userService.user.profile_id}.jpg`;
  }

  ngAfterViewInit() {
    this.cdRef.detectChanges();
  }

  ngDoCheck() {
    this.cdRef.detectChanges();
  }

  deleteAllCookies() {
    this.userService.set({});
    Cookie.deleteAll();
    this.router.navigate(['/auth']);
  }
}
