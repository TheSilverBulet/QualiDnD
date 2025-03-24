import { Component, OnInit } from '@angular/core';
import { LoginService } from '../shared/login.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ResetPasswordDialogComponent } from '../reset-password-dialog/reset-password-dialog.component';
import { AppViewService } from '../shared/app-view.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private dialog: MatDialog,
    private appView: AppViewService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
  }

  login() {
    this.loginService.login(this.username, this.password).subscribe(responseBody => {
      if (responseBody.success) {
        sessionStorage.setItem('currentUser', JSON.stringify(responseBody.activeUser));
        this.router.navigate(['/dashboard']);
      } else {
        this.notificationService.error("Login Error", "Incorrect Username/Password provided", 10000);
      }
    });
  }

  register() {
    this.router.navigate(['/register']);
  }


  resetDialog(): void {
    const dialogRef = this.dialog.open(ResetPasswordDialogComponent, {
      width: '550px',
      autoFocus: false
    });
  }

  get isMobile() {
    return this.appView.getIsMobileResolution();
  }

}
