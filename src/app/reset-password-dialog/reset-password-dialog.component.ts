import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../shared/user.service';
import { NotificationService } from '../notification.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset-password-dialog',
  templateUrl: './reset-password-dialog.component.html',
  styleUrls: ['./reset-password-dialog.component.scss'],
  imports: []
})
export class ResetPasswordDialogComponent implements OnInit {

  firstName: string;
  lastName: string;
  username: string;
  newPassword: string;
  newUsername: string;
  oldUsername: string;
  // tslint:disable-next-line:no-input-rename
  @Input('mat-dialog-close') dialogResult: unknown;
  resetFlag: string;

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
  }

  reset() {
    if (this.resetFlag === 'password') {
      if (this.checkValuesNotEmpty([this.firstName, this.username, this.newPassword])) {
        this.snackBar.open('None of the requested fields can be blank!', 'Close').onAction().subscribe(() => {
        });
      }
      const resetObj = {
        firstname: this.firstName,
        username: this.username,
        newPassword: this.newPassword
      };
      this.userService.resetPassword(resetObj).subscribe(resp => {
        if (resp) {
          this.notificationService.success("Password Reset Success", "Your password was reset successfully", 4000);
        } else {
          this.notificationService.error("Password Reset Error", "There was an error resetting your password", 4000);
        }
      });
    } else {
      if (this.checkValuesNotEmpty([this.firstName, this.lastName, this.newUsername, this.oldUsername])) {
        this.snackBar.open('None of the requested fields can be blank!', 'Close').onAction().subscribe(() => {
        });
      }
      const resetObj = {
        firstname: this.firstName,
        lastName: this.lastName,
        newUsername: this.newUsername,
        oldUsername: this.oldUsername
      };
      this.userService.resetUsername(resetObj).subscribe(resp => {
        if (resp) {
          this.notificationService.success("Username Reset Success", "Your username was reset successfully", 4000);
        } else {
          this.notificationService.error("Username Reset Error", "There was an error resetting your username", 4000);
        }
      });
    }
  }

  private checkValuesNotEmpty(values: string[]) {
    let emptyFound = false;
    values.forEach(val => {
      if (val === null || val === '' || val === ' ') {
        emptyFound = true;
      }
    });
    return emptyFound;
  }

}
