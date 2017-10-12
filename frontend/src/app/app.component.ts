import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate } from '@angular/animations';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import {NgSpinningPreloader} from 'ng2-spinning-preloader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('flyInOut1', [
      transition('void => *', [
        style({transform: 'translateX(10%)', opacity: 0}),
        animate('1s cubic-bezier(0.550, 0.055, 0.675, 0.190)')
      ])
    ])
  ]
})
export class AppComponent implements OnInit{
  private token = '';

  constructor(private ngSpinningPreloader: NgSpinningPreloader) {}

  ngOnInit() {
    this.token = Cookie.get('token');
    this.ngSpinningPreloader.stop();
  }
}
