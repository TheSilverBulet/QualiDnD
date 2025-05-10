import { Component, OnInit } from '@angular/core';
import { LoginService } from '../shared/login.service';
import { Router } from '@angular/router';
import { IUser } from '../shared/models.component';
import { DiceRollerDialogComponent } from '../dice-roller-dialog/dice-roller-dialog.component';
import { ReferenceDialogComponent } from '../reference-dialog/reference-dialog.component';
import { AuthService } from '../authorization/auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-toolbar',
  templateUrl: './app-toolbar.component.html',
  styleUrls: ['./app-toolbar.component.scss'],
  standalone: false
})
export class AppToolbarComponent implements OnInit {

  isAdmin = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService
  ) {
    this.isAdmin = this.authService.isAdmin;
  }

  ngOnInit() {
  }

  toDashboard(): void {
    this.router.navigateByUrl('dashboard');
  }

  toUser(): void {
    this.router.navigate(['/user']);
  }

  toAdmin(): void {
    this.router.navigate(['/admin']);
  }

  toChanges(): void {
    this.router.navigate(['/changes']);
  }

  openDiceRoller() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.width = '400px';

    this.dialog.open(DiceRollerDialogComponent, dialogConfig);
  }

  openReferenceDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.width = '600px';

    this.dialog.open(ReferenceDialogComponent, dialogConfig);
  }

  logout(): void {
    this.loginService.logout();
  }

  get isLoggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }

  get username(): string {
    return JSON.parse(sessionStorage.getItem('currentUser')).username;
  }

  get user(): IUser {
    return JSON.parse(sessionStorage.getItem('currentUser'));
  }

}
