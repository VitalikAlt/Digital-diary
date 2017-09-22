import { Component, OnInit, EventEmitter } from '@angular/core';
import { MaterializeAction, toast } from "angular2-materialize";
import { HttpService } from '../../services/http.service';
import {Md5} from 'ts-md5/dist/md5';

@Component({
  selector: 'app-admin-reset',
  templateUrl: './admin-reset.component.html',
  styleUrls: ['./admin-reset.component.css']
})
export class AdminResetComponent implements OnInit {

  public adminResetModal = new EventEmitter<string|MaterializeAction>();

  public secretKey: string = '';
  public login: string = '';
  public password: string = '';

  constructor(private httpService: HttpService) { }

  ngOnInit() { }

  openAdminResetModal() {
    this.adminResetModal.emit({action:"modal",params:['open']});
  }

  reset() {
    if (!this.secretKey || !this.login || !this.password)
      return this.showResetError('Bad params in request');

    this.httpService.resetAdmin(this.login, Md5.hashStr(this.password).toString(), this.secretKey)
      .subscribe(() => {
        toast('Профиль восстановлен!', 4000, 'success-toast');
      }, (error) => {
        this.showResetError(error);
      })
  }

  showResetError(err) {
    switch (err) {
      case 'Bad params in request':
        toast('Заполнены не все поля!', 4000, 'error-toast');
        break;
      case 'No permission for this request!':
        toast('Серкретный ключ неверен!', 4000, 'error-toast');
        break;
      default:
        toast(err, 4000, 'error-toast');
    }
  }
}
