import { Component, OnInit, EventEmitter } from '@angular/core';
import { MaterializeAction, toast } from "angular2-materialize";
import { HttpService } from '../../../../services/http.service';
import { Configs } from '../../../../services/user.service';

@Component({
  selector: 'app-admin-misses',
  templateUrl: 'misses.component.html',
  styleUrls: ['misses.component.css']
})
export class AdminMissesComponent implements OnInit {

  public modalScheduleEdit = new EventEmitter<string|MaterializeAction>();

  public schedule;

  public groupIds: Object = {};
  public courses: Array<string> = [];
  public squads: Array<string> = [];

  public currentCourse: string = '';
  public currentSquad: string = '';

  public lessons: Array<string> = Configs.scheduleLessonsList;
  public days: Array<Array<string>> = Configs.scheduleDaysList;

  public currentTime: number;
  public currentDay: number;

  public teachers: Array<Object> = [];
  public disciplines: Array<Object> = [];
  public teacherFilters: {name} = {name: ''};

  public editScheduleCell:
    {id: string, group_id: string, room: string, teacher_id: string, discipline_id: string, week_number: number, day_number: number, lesson_number: number}
    = {id: '', group_id: '', room: '', teacher_id: '', discipline_id: '', week_number: 1, day_number: 1, lesson_number: 1};

  constructor(private httpService: HttpService) { }

  ngOnInit() {
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

  //TODO добавить удаление ячеек
  //TODO сделать так, чтобы преподаватели были привязаны к выбранной группе
  openModalScheduleEdit(weekNumber, dayNumber, lessonNumber) {
    this.editScheduleCell.week_number = weekNumber;
    this.editScheduleCell.day_number = dayNumber + 1;
    this.editScheduleCell.lesson_number = lessonNumber + 1;

    this.httpService.getTeacherList()
      .subscribe((teachers) => {
        this.teachers = teachers;
        this.modalScheduleEdit.emit({action:"modal",params:['open']});
      }, (error) => {
        toast('Неизвестная ошибка!', 4000, 'error-toast');
        console.log(error);
      });
  }

  closeModalScheduleEdit() {
    this.modalScheduleEdit.emit({action:"modal",params:['close']});
  }

  getSchedule() {
    if (!this.currentCourse || !this.currentSquad)
      return;

    this.schedule = [];
    const groupId = this.groupIds[`${this.currentCourse}_${this.currentSquad}`];

    if (!groupId)
      return toast('Проблема с группами, перезагрузите страницу!', 4000, 'error-toast');

    this.httpService.getSchedule(groupId)
      .subscribe((schedule) => {
        this.schedule = schedule;
        console.log(this.schedule);
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

  saveScheduleCell() {
    const groupId = this.groupIds[`${this.currentCourse}_${this.currentSquad}`];

    if (!groupId)
      return toast('Проблема с группами, перезагрузите страницу!', 4000, 'error-toast');

    this.editScheduleCell.group_id = groupId;
    this.httpService.updateScheduleCell(this.editScheduleCell)
      .subscribe((res) => {
        toast('Данные сохранены!', 4000, 'success-toast');
        this.closeModalScheduleEdit();
        this.getSchedule();
      }, (error) => {
        toast('Неизвестная ошибка!', 4000, 'error-toast');
        console.log(error);
      })
  }

  updateDisciplines() {
    this.httpService.getSubjectsByTeacher(this.editScheduleCell.teacher_id)
      .subscribe((disciplines) => {
        this.disciplines = disciplines;
      }, (error) => {
        toast('Неизвестная ошибка!', 4000, 'error-toast');
        console.log(error);
      })
  }
}
