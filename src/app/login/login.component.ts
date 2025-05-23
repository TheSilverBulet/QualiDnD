import { NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field'
import {
  FormControl,
  FormGroupDirective,
  FormGroup,
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
import { MatIconModule } from '@angular/material/icon';
import { IUserRegistration } from '../user.interfaces';

/** Error when invalid control is dirty, touched, or submitted. */
export class LoginErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  imports: [NgOptimizedImage, MatCardModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: '../shared-styles/login-styles.scss'
})
export class LoginComponent implements OnInit{

  ngOnInit(): void {
  }

  constructor(
    private userService: UserService,
    private router: Router
  ) {

  }

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });
  matcher: ErrorStateMatcher = new LoginErrorStateMatcher();

  clear() {
    this.loginForm.reset();
  }

  login() {
    let success = this.userService.login(this.loginForm.value as IUserRegistration);
    if (success){
      this.router.navigate(['dashboard']);
    } else {
      
    }
  }

  register() {
    this.router.navigate(['register']);
  }

}
