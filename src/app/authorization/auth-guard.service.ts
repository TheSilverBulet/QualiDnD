import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {


  constructor(
    private readonly authService: AuthService,
    private router: Router) {
  }

  canActivate(): boolean {
    if (!this.authService.loggedIn) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

}
