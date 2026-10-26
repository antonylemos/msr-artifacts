import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcome } from './nx-welcome';
import { Button } from '@angular-monorepo/button';
import { UserService } from '@angular-monorepo/data';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule, NxWelcome, RouterModule, Button],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  public readonly userService = inject(UserService);
  protected title = 'host';

  public simulateLogin() {
    this.userService.login();
  }
  public simulateLogout() {
    this.userService.logout();
  }

  public get isLoggedIn() {
    return this.userService.isLoggedIn();
  }
}
