import { Component } from '@angular/core';
// @ts-ignore
import { userState } from '@myapp/common-lib-webpack';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-app';
  user = '';

  constructor() {
    userState.user$.subscribe((user: string) => {
      console.log('User from common-lib-webpack:', user);
      this.user = user;
    });
  }
}
