import { Injectable } from '@angular/core';
import { LoggedInUser, Role } from '../user.interfaces';

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
      return this.getUser.role === Role.ADMIN;
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
