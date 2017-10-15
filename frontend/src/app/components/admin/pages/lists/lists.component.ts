import { Component, OnInit } from '@angular/core';
import { FadeInOutAnimation } from '../../../../animations/FadeInOutAnimation';

@Component({
  selector: 'app-admin-lists',
  templateUrl: 'lists.component.html',
  styleUrls: ['lists.component.css'],
  animations: [FadeInOutAnimation]
})
export class AdminListsComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
