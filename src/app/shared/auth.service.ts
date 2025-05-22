import { Injectable, signal } from '@angular/core';
import { LoggedInUser } from '../user.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public get loggedIn(): boolean {
    return this.getUser !== null;
  }

  public get isAdmin(): boolean {
    if (this.loggedIn && this.getUser) {
      return this.getUser.role === 'ADMIN';
    }
    return false;
  }

  public get getLoggedInUsername(): string {
    if (this.getUser){
      return this.getUser.username;
    }
    return '';
  }

  //TODO: FIX
  private get getUser(): LoggedInUser | null{
    return null;
  }
}
