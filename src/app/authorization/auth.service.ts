import { Injectable } from '@angular/core';
import { IUser } from '../shared/models.component';

@Injectable()
export class AuthService {

  constructor(
  ) { }

  public get loggedIn(): boolean {
    return this.getUser !== null;
  }

  public get isAdmin(): boolean {
    if (this.loggedIn) {
      return this.getUser.role === 'ADMIN';
    }
    return false;
  }

  public get getLoggedInUsername(): string {
    return this.getUser.username;
  }

  private get getUser(): IUser {
    return JSON.parse(sessionStorage.getItem('currentUser') as string);
  }
}
