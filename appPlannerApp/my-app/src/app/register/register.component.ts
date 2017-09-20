import { Component, OnInit } from '@angular/core';

import { RegisterUserModel } from '../shared/models/register.user.model'
import {AddressModel} from "../shared/models/address.model";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerusermodel = new RegisterUserModel('','','','',['']);
  addressmodel = new AddressModel('','','','','');

  constructor() { }

  ngOnInit() {
  }

  get currentUser() { return JSON.stringify(this.registerusermodel); }

  doRegister(event) {
    console.log(event);
    this.registerusermodel.address[0] = this.addressmodel;
    console.log(this.registerusermodel);
  }
}
