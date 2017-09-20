import { Component, OnInit } from '@angular/core';

import { LoginUserModel } from '../shared/models/login.user.model'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model = new LoginUserModel('','');

  constructor() { }

  ngOnInit() {
  }

  get currentUser() { return JSON.stringify(this.model); }

  doLogin(event) {
    console.log(event);
    console.log(this.model);
  }
}
