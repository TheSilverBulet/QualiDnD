import { Injectable } from '@angular/core';
import { ILoginResponse, IUserRegistration, SESSION_USER } from '../user.interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

const LOGIN_SLUG: string = "/login";
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { 

  }

  login(login: IUserRegistration): boolean {
    let success: boolean = false;
    this.http.post<ILoginResponse>(environment.apiUrl + LOGIN_SLUG, login).subscribe({
      next: (resp: ILoginResponse) => {
        if (resp.success){
          sessionStorage.setItem(SESSION_USER, JSON.stringify(resp.activeUser));
          success = true;
        }
        console.error("Received a response but was not able to login!");
      },
      error: (resp) => {
        console.error("Failed to login, error from API call!");
      }
    });
    return success;
  }
}
