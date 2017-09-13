import { Component, OnInit, EventEmitter } from '@angular/core';
import { MaterializeAction, toast } from "angular2-materialize";
import { HttpService } from '../../../../services/http.service';

@Component({
  selector: 'app-admin-subjects',
  templateUrl: 'subjects.component.html',
  styleUrls: ['subjects.component.css']
})
export class AdminSubjectsComponent implements OnInit {

  public addDisciplineModal = new EventEmitter<string|MaterializeAction>();
  public editSubjectModal = new EventEmitter<string|MaterializeAction>();
  public deleteSubjectModal = new EventEmitter<string|MaterializeAction>();

  public disciplineName: string = '';
  public teacherSearch: string = '';
  public selectedItem: any;

  public groupCourseSearch: string = '';
  public groupSquadSearch: string = '';
  public groupAssignedSearch: boolean = false;
  public groupAssignedSearchPower: boolean = false;

  //*****************************************************************************
  public addSubjectData: any;

  public subjectsSorts: [string, boolean] = ['name', false];
  public subjectFilters: Object = {name: '', teacher: ''};

  public teacherFilters: Object = {name: ''};

  public groupSorts: [string, boolean] = ['course', false];
  public groupFilters: Object = {course: '', squad: ''};

  //*************************************************************************

  public subjects: Array<Object> = [];
  public teachers: Array<Object> = [];

  public groups = [
    {
      course: 1,
      squad: 1,
      count: 1,
      assigned: false
    }, {
      course: 2,
      squad: 2,
      count: 2,
      assigned: true
    }, {
      course: 3,
      squad: 3,
      count: 3,
      assigned: false
    }, {
      course: 1,
      squad: 3,
      count: 3,
      assigned: true
    }, {
      course: 13,
      squad: 23,
      count: 34,
      assigned: true
    }
  ];

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.addSubjectData = {};

    this.httpService.getSubjectList()
      .subscribe((subjects) => {
        this.subjects = subjects;
      }, (error) => {
        toast('Неизвестная ошибка!', 4000, 'error-toast');
        console.log(error);
      })
  }

  addSubject() {
    this.httpService.addSubject(this.addSubjectData.name, this.addSubjectData.teacher.id)
      .subscribe((id) => {
        this.subjects.push({id, name: this.disciplineName, teacher: this.addSubjectData.teacher.name});
        toast('Дисциплина добавлена!', 4000, 'success-toast');
        this.closeModalDisciplineAdd()
      }, (error) => {
        if (error === 'No user with that id!')
          return toast('Преподаватель не найден, обновите страницу!', 4000, 'error-toast');

        toast('Неизвестная ошибка!', 4000, 'error-toast');
        console.log(error);
      });
  }

  deleteSubject() {
    this.subjects.splice(this.subjects.indexOf(this.selectedItem), 1);
  }

  openModalDisciplineAdd() {
    this.httpService.getTeacherList()
      .subscribe((teachers) => {
        this.teachers = teachers;
        this.addDisciplineModal.emit({action:"modal",params:['open']});
      }, (error) => {
        toast('Неизвестная ошибка!', 4000, 'error-toast');
        console.log(error);
      });
  }

  openModalSubjectDelete() {
    this.deleteSubjectModal.emit({action:"modal",params:['open']});
  }

  openModalSubjectEdit() {
    this.editSubjectModal.emit({action:"modal",params:['open']});
  }

  closeModalDisciplineAdd() {
    this.addDisciplineModal.emit({action:"modal",params:['close']});
  }

  closeModalSubjectDelete() {
    this.deleteSubjectModal.emit({action:"modal",params:['close']});
  }

  closeModalSubjectEdit() {
    this.editSubjectModal.emit({action:"modal",params:['close']});
  }



  changeSubjectSort(type: string) {
    this.changeSort(this.subjectsSorts, type);
  }

  changeGroupSort(type: string) {
    this.changeSort(this.groupSorts, type);
  }

  changeSort(sort: Object, newType: string) {
    sort[1] = (sort[0] === newType)? !sort[1] : false;
    sort[0] = newType;
  }
}
