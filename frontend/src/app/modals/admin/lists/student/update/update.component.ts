import { Component, OnInit, EventEmitter } from '@angular/core';
import { MaterializeAction, toast } from "angular2-materialize";
import { HttpService } from '../../../../../services/http.service';

@Component({
  selector: 'app-admin-lists-update-student-modal',
  templateUrl: 'update.component.html',
  styleUrls: ['update.component.css']
})
export class UpdateStudentModal implements OnInit {

  public user: any = {};
  public changeStudentModal = new EventEmitter<string|MaterializeAction>();

  constructor(private httpService: HttpService) { }

  ngOnInit() { }

  updateStudent() {
    const birthDate = this.user.birth_date.split('/');
    this.user.birth_date = new Date(birthDate[2], birthDate[1], birthDate[0]);

    this.httpService.updateStudentProfile(this.user)
      .subscribe(() => {
        toast('Студент обновлён!', 4000, 'success-toast');
        this.close();
      }, (error) => {
        if (error === "No user with that id!")
          return toast('Студент не найден, обновите страницу!', 4000, 'error-toast');

        toast('Неизвестная ошибка!', 4000, 'error-toast');
        console.log(error);
      })
  }

  open(user) {
    this.user = user;
    this.httpService.getStudentProfile(this.user.id)
      .subscribe((result) => {
        this.changeStudentModal.emit({action:"modal",params:['open']});

        result['id'] = this.user.id;
        this.user = result;
      }, (error) => {
        if (error === "No user with that id!")
          return toast('Студент не найден, обновите страницу!', 4000, 'error-toast');

        toast('Неизвестная ошибка!', 4000, 'error-toast');
        console.log(error);
      })
  }

  close() {
    this.changeStudentModal.emit({action:"modal",params:['close']});
  }
}
