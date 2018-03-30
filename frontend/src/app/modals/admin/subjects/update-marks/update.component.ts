import { Component, OnInit, EventEmitter } from '@angular/core';
import { MaterializeAction, toast } from "angular2-materialize";
import { HttpService } from '../../../../services/http.service';

@Component({
  selector: 'app-admin-subjects-update-marks-modal',
  templateUrl: 'update.component.html',
  styleUrls: ['update.component.css']
})
export class UpdateMarksModal implements OnInit {

  public currentDisciplineId: string = '';
  public currentCourse: string = '';
  public currentSquad: string = '';

  public groupIds: Object = {};
  public courses: Array<string> = [];
  public squads: Array<string> = [];

  public marks: any = {};
  public terms: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0];
  public changeMarksModal = new EventEmitter<string|MaterializeAction>();


  constructor(private httpService: HttpService) { }

  ngOnInit() { }

  open(disciplineId) {
    this.currentDisciplineId = disciplineId;
    this.updateCoursesAndGroups();
    this.changeMarksModal.emit({action:"modal",params:['open']});
  }

  close() {
    this.changeMarksModal.emit({action:"modal",params:['close']});
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
