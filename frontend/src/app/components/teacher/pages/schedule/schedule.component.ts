import { Component, OnInit } from '@angular/core';
import { toast } from "angular2-materialize";
import { HttpService } from '../../../../services/http.service';
import { Configs, UserService } from '../../../../services/user.service';
import { FadeInOutAnimation } from '../../../../animations/FadeInOutAnimation';

@Component({
  selector: 'app-teacher-schedule',
  templateUrl: 'schedule.component.html',
  styleUrls: ['schedule.component.css'],
  animations: [FadeInOutAnimation]
})
export class TeacherScheduleComponent implements OnInit {

  public schedule;
  public lessons: Array<string> = Configs.scheduleLessonsList;
  public days: Array<Array<string>> = Configs.scheduleDaysList;

  constructor(private httpService: HttpService, private userService: UserService) { }

  ngOnInit() {
    this.httpService.getTeacherProfile(this.userService.user.profile_id)
      .subscribe((teacher) => {
        this.getTeacherSchedule(teacher['id']);
      }, (error) => {
        if (error === "No user with that id!")
          return toast('Преподаватель не найден, обновите страницу!', 4000, 'error-toast');

        toast('Неизвестная ошибка!', 4000, 'error-toast');
        console.log(error);
      })
  }

  getTeacherSchedule(teacherId) {
    this.httpService.getScheduleTeacher(teacherId)
      .subscribe((schedule) => {
        this.schedule = schedule;
      }, (error) => {
        toast('Неизвестная ошибка!', 4000, 'error-toast');
        console.log(error);
      });
  }

  getCell(week, lesson, day) {
    try {
      const cell = this.schedule[week][lesson + 1][day + 1];
      return `${cell.discipline_name} ${cell.group_name} ${cell.room}`
    } catch (err) {
      return '';
    }
  }
}
