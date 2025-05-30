import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  canActivate(): boolean {
    if (!this.authService.isAdmin) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
