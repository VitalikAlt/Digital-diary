import { Component, OnInit } from '@angular/core';
import { FadeInOutAnimation } from '../../../../animations/FadeInOutAnimation';

@Component({
  selector: 'app-teacher-reports',
  templateUrl: 'reports.component.html',
  styleUrls: ['reports.component.css'],
  animations: [FadeInOutAnimation],
  host: { '[@FadeInOutAnimation]': 'true' }
})
export class TeacherReportsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
