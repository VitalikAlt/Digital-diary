import { Component, OnInit } from '@angular/core';
import { toast } from "angular2-materialize";
import { HttpService } from '../../../../services/http.service';
import { UserService } from '../../../../services/user.service';
import { FadeInOutAnimation } from '../../../../animations/FadeInOutAnimation';

@Component({
  selector: 'app-teacher-journal',
  templateUrl: 'journal.component.html',
  styleUrls: ['journal.component.css'],
  animations: [FadeInOutAnimation],
  host: { '[@FadeInOutAnimation]': 'true' }
})
export class TeacherJournalComponent implements OnInit {

  public currentDisciplineId: string = '';
  public currentCourse: string = '';
  public currentSquad: string = '';


  public disciplines: Array<Object> = [];

  public groupIds: Object = {};
  public courses: Array<string> = [];
  public squads: Array<string> = [];


  public marks: any = {};
  public terms: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0];

  constructor(private userService: UserService, private httpService: HttpService) { }

  ngOnInit() {
    this.httpService.getSubjectsByTeacher(this.userService.user.profile_id)
      .subscribe((disciplines) => {
        this.disciplines = disciplines;
      }, (error) => {
        toast('Неизвестная ошибка!', 4000, 'error-toast');
        console.log(error);
      })
  }

  updateCoursesAndGroups() {
    this.marks = {};
    this.currentCourse = '';
    this.currentSquad = '';

    this.httpService.getAssignedGroups(this.currentDisciplineId)
      .subscribe((courseAndSquadList) => {
        this.squads = courseAndSquadList.squads;
        this.courses = courseAndSquadList.courses;
        this.groupIds = courseAndSquadList.ids;
      }, (error) => {
        toast('Неизвестная ошибка!', 4000, 'error-toast');
        console.log(error);
      })
  }

  getMarks() {
    if (!this.currentCourse || !this.currentSquad)
      return;

    const groupId = this.groupIds[`${this.currentCourse}_${this.currentSquad}`];

    if (!groupId)
      return toast('Проблема с группами, перезагрузите страницу!', 4000, 'error-toast');

    this.httpService.getMarks(this.currentDisciplineId, groupId)
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

  saveMarks() {
    delete this.marks['keys'];

    this.httpService.updateMarks(this.currentDisciplineId, this.marks)
      .subscribe(() => {
        toast('Оценки сохранены!', 4000, 'success-toast');
        this.getMarks();
      }, (error) => {
        toast('Неизвестная ошибка!', 4000, 'error-toast');
        console.log(error);
      })
  }

  markTracker(index: number) {
    return index;
  }
}
