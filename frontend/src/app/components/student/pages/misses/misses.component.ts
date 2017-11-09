import { Component, OnInit } from '@angular/core';
import { toast } from "angular2-materialize";
import { HttpService } from '../../../../services/http.service';
import {Configs, UserService} from '../../../../services/user.service';
import { FadeInOutAnimation } from '../../../../animations/FadeInOutAnimation';

@Component({
  selector: 'app-teacher-misses',
  templateUrl: 'misses.component.html',
  styleUrls: ['misses.component.css'],
  animations: [FadeInOutAnimation]
})
export class StudentMissesComponent implements OnInit {

  public misses: any = [];
  public lessons: Array<string> = Configs.scheduleLessonsList;

  constructor(private userService: UserService,private httpService: HttpService) { }

  ngOnInit() {
    this.httpService.getStudentMisses(this.userService.user.profile_id)
      .subscribe((misses) => {
        console.log(misses)
        this.misses = misses;
      }, (error) => {
        toast('Неизвестная ошибка!', 4000, 'error-toast');
        console.log(error);
      })
  }
}
