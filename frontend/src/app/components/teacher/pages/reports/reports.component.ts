import { Component, OnInit } from '@angular/core';
import { FadeInOutAnimation } from '../../../../animations/FadeInOutAnimation';

@Component({
  selector: 'app-teacher-reports',
  templateUrl: 'reports.component.html',
  styleUrls: ['reports.component.css'],
  animations: [FadeInOutAnimation]
})
export class TeacherReportsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
