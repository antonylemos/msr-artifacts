import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private isLoggenIn = signal(false);
  constructor() {}

  login() {
    this.isLoggenIn.set(true);
  }

  logout() {
    this.isLoggenIn.set(false);
  }

  get isLoggedIn() {
    return this.isLoggenIn;
  }
}
