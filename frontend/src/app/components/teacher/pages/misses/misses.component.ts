import { Component, OnInit, EventEmitter } from '@angular/core';
import { MaterializeAction, toast } from "angular2-materialize";
import { HttpService } from '../../../../services/http.service';
import { Configs } from '../../../../services/user.service';
import { FadeInOutAnimation } from '../../../../animations/FadeInOutAnimation';

@Component({
  selector: 'app-teacher-misses',
  templateUrl: 'misses.component.html',
  styleUrls: ['misses.component.css'],
  animations: [FadeInOutAnimation]
})
export class TeacherMissesComponent implements OnInit {

  public modalMissesEdit = new EventEmitter<string|MaterializeAction>();

  public misses: any;

  public currentStudentId: string = '';
  public currentMissData: {id, lesson_number: number, reason: string} = {id: '', lesson_number: 0, reason: ''};

  public missesDate: string;
  public currentCourse: string = '';
  public currentSquad: string = '';

  public groupIds: Object = {};
  public courses: Array<string> = [];
  public squads: Array<string> = [];

  public lessons: Array<string> = Configs.scheduleLessonsList;

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.misses = {};
    this.currentCourse = '';
    this.currentSquad = '';

    this.httpService.getAssignedGroups()
      .subscribe((courseAndSquadList) => {
        this.squads = courseAndSquadList.squads;
        this.courses = courseAndSquadList.courses;
        this.groupIds = courseAndSquadList.ids;
      }, (error) => {
        toast('Неизвестная ошибка!', 4000, 'error-toast');
        console.log(error);
      })
  }

  getMisses() {
    this.misses = {};

    if (!this.currentCourse || !this.currentSquad)
      return;

    const groupId = this.groupIds[`${this.currentCourse}_${this.currentSquad}`];

    if (!groupId)
      return toast('Проблема с группами, перезагрузите страницу!', 4000, 'error-toast');

    const date = this.missesDate.split('/');
    this.httpService.getMisses(new Date(Number(date[2]), Number(date[1]), Number(date[0])), groupId)
      .subscribe((misses) => {
        this.misses = misses;
        this.misses.keys = Object.keys(misses);
        console.log(this.misses)
      }, (error) => {
        toast('Неизвестная ошибка!', 4000, 'error-toast');
        console.log(error);
      })
  }

  saveMissesCell() {
    const date = this.missesDate.split('/');
    this.httpService.updateMissesCell(this.currentStudentId, new Date(Number(date[2]), Number(date[1]), Number(date[0])), this.currentMissData.lesson_number, this.currentMissData.reason, this.currentMissData.id)
      .subscribe(() => {
        toast('Данные сохранены!', 4000, 'success-toast');
        this.closeModalMissesEdit();
        this.getMisses();
      }, (error) => {
        toast('Неизвестная ошибка!', 4000, 'error-toast');
        console.log(error);
      })
  }

  deleteMissesCell() {
    if (!this.currentMissData.id) {
      this.currentMissData.reason = '';
      toast('Пропуск успешно удалён!', 4000, 'success-toast');
      this.closeModalMissesEdit();
      return this.getMisses();
    }

    this.httpService.deleteMissesCell(this.currentMissData.id)
      .subscribe(() => {
        toast('Пропуск успешно удалён!', 4000, 'success-toast');
        this.closeModalMissesEdit();
        this.getMisses();
      }, (error) => {
        toast('Неизвестная ошибка!', 4000, 'error-toast');
        console.log(error);
      })
  }

  openModalMissesEdit(miss, lessonNumber, studentId) {
    miss = miss || {};
    miss.lesson_number = lessonNumber;

    this.currentMissData = miss;
    this.currentStudentId = studentId;

    this.modalMissesEdit.emit({action:"modal",params:['open']});
  }

  closeModalMissesEdit() {
    this.modalMissesEdit.emit({action:"modal",params:['close']});
  }
}
