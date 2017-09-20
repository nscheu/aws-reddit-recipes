import { Component } from '@angular/core';

@Component({
  template: `<app-nav></app-nav>
    <h1>{{ title }}</h1>
    <app-login></app-login>
    <app-register></app-register>
    
  `,
  //<app-footer></app-footer>
  selector: 'app-root',
  //templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'FriendShare';

}
