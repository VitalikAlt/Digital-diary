import { Component, OnInit, EventEmitter } from '@angular/core';
import { MaterializeAction, toast } from "angular2-materialize";
import { HttpService } from '../../../../services/http.service';

@Component({
  selector: 'app-admin-groups',
  templateUrl: 'groups.component.html',
  styleUrls: ['groups.component.css']
})
export class AdminGroupsComponent implements OnInit {

  public modalCurseUp = new EventEmitter<string|MaterializeAction>();

  public groups: Array<Object> = [];
  public groupSorts: [string, boolean] = ['course', false];
  public groupFilters: Object = {course: '', squad: '', student_count: ''};

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.httpService.getGroupList()
      .subscribe((groups) => {
        this.groups = groups;
      }, (error) => {
        toast('Неизвестная ошибка!', 4000, 'error-toast');
        console.log(error);
      })
  }

  upCourse() {
    this.httpService.upGroups()
      .subscribe(() => {
        this.ngOnInit();
        toast('Все группы переведенны на новый курс!', 4000, 'success-toast');
        this.closeModalCurseUp();
      }, (error) => {
        toast('Неизвестная ошибка!', 4000, 'error-toast');
        console.log(error);
      });
  }

  openModalCurseUp() {
    this.modalCurseUp.emit({action:"modal",params:['open']});
  }

  closeModalCurseUp() {
    this.modalCurseUp.emit({action:"modal",params:['close']});
  }

  changeGroupSort(type: string) {
    this.groupSorts[1] = (this.groupSorts[0] === type)? !this.groupSorts[1] : false;
    this.groupSorts[0] = type;
  }
}
