import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { IUser } from './models.component';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(username: string, password: string) {
    return this.http.post<any>(environment.apiUrl + '/login', { username, password });
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem('currentUser') !== null;
  }

  getUsername(): string {
    const activeUser: IUser = JSON.parse((sessionStorage.getItem('currentUser') as string));
    return activeUser.username;
  }
}
