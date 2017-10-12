import { Component, OnInit } from '@angular/core';
import { toast } from "angular2-materialize";
import { HttpService } from '../../../../services/http.service';
import { Configs, UserService } from '../../../../services/user.service';
import { FadeInOutAnimation } from '../../../../animations/FadeInOutAnimation';

@Component({
  selector: 'app-student-schedule',
  templateUrl: 'student-schedule.component.html',
  styleUrls: ['student-schedule.component.css'],
  animations: [FadeInOutAnimation],
  host: { '[@FadeInOutAnimation]': '' }
})
export class StudentScheduleComponent implements OnInit {

  public schedule;

  public lessons: Array<string> = Configs.scheduleLessonsList;
  public days: Array<Array<string>> = Configs.scheduleDaysList;

  constructor(private httpService: HttpService, private userService: UserService) { }

  ngOnInit() {
    const user = this.userService.user;

    this.httpService.getStudentProfile(user.profile_id)
      .subscribe((student) => {
        this.getStudentSchedule(student['group_id']);
      }, (error) => {
        if (error === "No user with that id!")
          return toast('Студент не найден, обновите страницу!', 4000, 'error-toast');

        toast('Неизвестная ошибка!', 4000, 'error-toast');
        console.log(error);
      })
  }

  getStudentSchedule(groupId) {
    this.httpService.getSchedule(groupId)
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
      return `${cell.discipline_name} ${cell.teacher_name} ${cell.room}`
    } catch (err) {
      return '';
    }
  }
}
