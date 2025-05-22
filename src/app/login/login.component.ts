import { NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field'
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';

/** Error when invalid control is dirty, touched, or submitted. */
export class LoginErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  imports: [NgOptimizedImage, MatCardModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  ngOnInit(): void {
  }

  constructor(
    private userService: UserService,
    private router: Router
  ) {

  }

  usernameFormControl: FormControl = new FormControl('', [Validators.required]);
  passwordFormControl: FormControl = new FormControl('', [Validators.required]);

  matcher: ErrorStateMatcher = new LoginErrorStateMatcher();

  clear() {
    console.log("Trying to clear vals!");
    this.usernameFormControl.patchValue('');
    this.usernameFormControl.markAsUntouched()
    this.passwordFormControl.patchValue('');
    this.passwordFormControl.markAsUntouched();
  }

  login() {

  }

}
