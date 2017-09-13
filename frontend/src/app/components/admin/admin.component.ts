import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-admin',
  templateUrl: 'admin.component.html',
  styleUrls: ['admin.component.css']
})

export class AdminComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() { }

  deleteAllCookies() {
    this.userService.set({});
    Cookie.deleteAll();
    console.log(Cookie.getAll());
    this.router.navigate(['/auth']);
  }
}
