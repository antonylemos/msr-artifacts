import { BehaviorSubject } from "rxjs";

class UserState {
  private _userSubject: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);
  user$ = this._userSubject.asObservable();
  setUser(user: string | null) {
    this._userSubject.next(user);
  }
  getUser() {
    return this._userSubject.getValue();
  }
  clearUser() {
    this._userSubject.next(null);
  }
}

export const userState = new UserState();
