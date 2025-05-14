import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IPasswordReset, IRegistrationCharacter, IRegistrationUser, IUser, IUsernameChange } from './models.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  getUsers(): IUser[] {
    let usrs: IUser[] = [];
    this.http.get(environment.apiUrl + '/admin/getUsers').subscribe(userList => {
      if (userList){
        usrs = userList as IUser[];
      }
    });
    return usrs;
  }

  get basicAuthCheck(): boolean {
    this.http.get(environment.apiUrl + '/authenticated').subscribe(data => {
      return data;
    });
    return false;
  }

  registerUser(newUser: IRegistrationUser, newCharacter: IRegistrationCharacter | null): boolean {
    let success: boolean = false;
    if (newCharacter === null) {
      this.http.post(environment.apiUrl + '/register', { newUser }).subscribe(resp => {
        if (resp) {
          success = true;
        }
      });
    } else {
      this.http.post(environment.apiUrl + '/register', { newUser, newCharacter }).subscribe(resp => {
        if (resp){
          success = true;
        }
      });
    }
    return success;
  }

  resetPassword(resetObj: IPasswordReset): boolean {
    let success: boolean = false;
    this.http.post(environment.apiUrl + '/registration/passwordReset', { resetObj }).subscribe(resp => {
      if (resp) {
        success = true;
      }
    });
    return success;
  }

  resetUsername(resetObj: IUsernameChange): boolean {
    let success: boolean = false;
    this.http.post(environment.apiUrl + '/registration/usernameReset', { resetObj }).subscribe(resp => {
      if (resp){
        success = true;
      }
    });
    return success;
  }

  getAllUsers(): IUser[] {
    let usrs: IUser[] = [];
    this.http.get(environment.apiUrl + '/getAllUsers').subscribe(resp => {
      if (resp){
        usrs = resp as IUser[];
      }
    });
    return usrs;
  }

  deleteUser(user: string): IUser[] {
    let usrs: IUser[] = [];
    this.http.post(environment.apiUrl + '/user/delete', { user }).subscribe(resp => {
      if (resp){
        usrs = resp as IUser[];
      }
    });
    return usrs;
  }
}
