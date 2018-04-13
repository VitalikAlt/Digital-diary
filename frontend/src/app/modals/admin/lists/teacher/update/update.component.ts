import {Component, OnInit, EventEmitter, ChangeDetectorRef} from '@angular/core';
import { MaterializeAction, toast } from "angular2-materialize";
import { HttpService } from '../../../../../services/http.service';
import {Preloader} from "../../../../../services/preloader.service";

@Component({
  selector: 'app-admin-lists-update-teacher-modal',
  templateUrl: 'update.component.html',
  styleUrls: ['update.component.css']
})
export class UpdateTeacherModal implements OnInit {

  public user: any = {};
  public photoUrl: string = '';
  public changeTeacherModal = new EventEmitter<string|MaterializeAction>();

  public filesToUpload: Array<File>;

  constructor(private httpService: HttpService, public preloader: Preloader,
              private cdRef: ChangeDetectorRef) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.cdRef.detectChanges();
  }

  ngDoCheck() {
    this.cdRef.detectChanges();
  }

  updateTeacher() {
    if (this.user.birth_date) {
      const birthDate = this.user.birth_date.split('/');
      this.user.birth_date = new Date(birthDate[2], birthDate[1], birthDate[0]);
    }

    this.httpService.updateTeacherProfile(this.user)
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
    this.photoUrl = `../../../../../../assets/data/photo/teacher/${this.user.id}.jpg`;
    this.httpService.getTeacherProfile(this.user.id)
      .subscribe((result) => {
        this.changeTeacherModal.emit({action:"modal",params:['open']});

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
    this.changeTeacherModal.emit({action:"modal",params:['close']});
  }

  onErrorPhotoUrl() {
    this.photoUrl = `../../../../../../assets/data/photo/teacher/default.png`;
  }

  fileChangedEvent(fileInput: any){
    this.filesToUpload = fileInput.target.files;
    this.upload();
  }

  //TODO refactor upload, change toast to warning
  upload() {
    toast('Загрузка!', 4000, 'success-toast');

    if (this.filesToUpload[0].name.slice(this.filesToUpload[0].name.lastIndexOf('.'), this.filesToUpload[0].name.length) !== '.jpg') {
      return toast('Неподдерживаемый формат, нужен jpg!', 4000, 'error-toast');
    }

    this.httpService.uploadUserPhoto(this.filesToUpload, this.user.id, 'teacher')
    .then((result) => {
      toast('Фото успешно обновлено!', 4000, 'success-toast');
      this.photoUrl = `../../../../../../assets/data/photo/teacher/${this.user.id}.jpg?a=${Math.random()}`;
      this.filesToUpload = [];
    }, (error) => {
      this.filesToUpload = [];
      toast('Ошибка загрузки фото!', 4000, 'error-toast');
      console.error(error);
    });
  }

}
