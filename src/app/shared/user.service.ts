import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  getUsers(): any {
    return this.http.get(environment.apiUrl + '/admin/getUsers');
  }

  get basicAuthCheck(): boolean {
    this.http.get(environment.apiUrl + '/authenticated').subscribe(data => {
      return data;
    });
    return false;
  }

  registerUser(newUser, newCharacter): any {
    if (newCharacter === null) {
      return this.http.post(environment.apiUrl + '/register', { newUser });
    }
    return this.http.post(environment.apiUrl + '/register', { newUser, newCharacter });
  }

  resetPassword(resetObj): any {
    return this.http.post(environment.apiUrl + '/registration/passwordReset', { resetObj });
  }

  resetUsername(resetObj): any {
    return this.http.post(environment.apiUrl + '/registration/usernameReset', { resetObj });
  }

  getAllUsers(): any {
    return this.http.get(environment.apiUrl + '/getAllUsers');
  }

  deleteUser(user: string): any {
    return this.http.post(environment.apiUrl + '/user/delete', { user });
  }
}
