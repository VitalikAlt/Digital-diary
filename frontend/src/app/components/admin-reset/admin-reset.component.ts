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
    this.httpService.resetAdmin(this.secretKey, this.login, this.password)
      .subscribe((result) => {
        toast('12323213213', 4000, 'error');
        console.log(result)
      }, (error) => {
        toast('12323213213', 4000, 'red');
        console.log(error)
      })
  }
}
