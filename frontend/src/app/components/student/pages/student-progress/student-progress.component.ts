import { Component, OnInit } from '@angular/core';
import { toast } from "angular2-materialize";
import { HttpService } from '../../../../services/http.service';
import { UserService } from '../../../../services/user.service';
import { FadeInOutAnimation } from '../../../../animations/FadeInOutAnimation';

@Component({
  selector: 'app-student-progress',
  templateUrl: 'student-progress.component.html',
  styleUrls: ['student-progress.component.css'],
  animations: [FadeInOutAnimation]
})
export class StudentProgressComponent implements OnInit {

  public marks: any = {};
  public terms: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0];

  constructor(private userService: UserService, private httpService: HttpService) { }

  ngOnInit() {
    this.httpService.getStudentMarks(this.userService.user.profile_id)
      .subscribe((marks) => {
        this.marks = marks;
        this.marks['keys'] = Object.keys(this.marks);

        if (this.marks['keys'][0])
          this.terms = this.marks[this.marks['keys'][0]].marks;

      }, (error) => {
        toast('Неизвестная ошибка!', 4000, 'error-toast');
        console.log(error);
      })
  }

  markTracker(index: number) {
    return index;
  }

  averageMark: number = 3.7;
  missedCount: number = 5;
  visitedCount: number = 5;
  missedPercent: number = this.missedCount/(this.missedCount + this.visitedCount)* 100;
}
