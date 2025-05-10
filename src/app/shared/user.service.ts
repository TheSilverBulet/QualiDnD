import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  getUsers(): unknown {
    return this.http.get(environment.apiUrl + '/admin/getUsers');
  }

  get basicAuthCheck(): boolean {
    this.http.get(environment.apiUrl + '/authenticated').subscribe(data => {
      return data;
    });
    return false;
  }

  registerUser(newUser, newCharacter): unknown {
    if (newCharacter === null) {
      return this.http.post(environment.apiUrl + '/register', { newUser });
    }
    return this.http.post(environment.apiUrl + '/register', { newUser, newCharacter });
  }

  resetPassword(resetObj): unknown {
    return this.http.post(environment.apiUrl + '/registration/passwordReset', { resetObj });
  }

  resetUsername(resetObj): unknown {
    return this.http.post(environment.apiUrl + '/registration/usernameReset', { resetObj });
  }

  getAllUsers(): unknown {
    return this.http.get(environment.apiUrl + '/getAllUsers');
  }

  deleteUser(user: string): unknown {
    return this.http.post(environment.apiUrl + '/user/delete', { user });
  }
}
