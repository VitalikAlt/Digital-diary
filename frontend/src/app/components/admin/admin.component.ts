import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Preloader } from '../../services/preloader.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-admin',
  templateUrl: 'admin.component.html',
  styleUrls: ['admin.component.css']
})

export class AdminComponent implements OnInit {

  constructor(private userService: UserService, private router: Router,
              private preloader: Preloader, private cdRef: ChangeDetectorRef) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.cdRef.detectChanges();
  }

  ngDoCheck() {
    this.cdRef.detectChanges();
  }

  deleteAllCookies() {
    this.userService.set({});
    Cookie.deleteAll();
    this.router.navigate(['/auth']);
  }
}
