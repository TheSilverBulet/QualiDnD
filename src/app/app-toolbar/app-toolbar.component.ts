import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toolbar',
  imports: [MatToolbarModule, MatMenuModule, MatIconModule, CommonModule],
  templateUrl: './app-toolbar.component.html',
  styleUrl: './app-toolbar.component.scss'
})
export class AppToolbarComponent implements OnInit{

  isAdmin: boolean = false;

  constructor(private router: Router) {

  }

  ngOnInit(): void {}

  toDashboard() {
    this.router.navigateByUrl("dashboard");
  }

  toUser() {
    return false;
  }

  toAdmin() {
    return false;
  }

  openDiceRoller() {
    return false;
  }

  openReferenceDialog() {
    return false;
  }

  logout(): void {
    sessionStorage.removeItem("currentUser");
    this.router.navigateByUrl("login");
  }

  get isLoggedIn(): boolean {
    return false;
  }

  get username(): string {
    return "Hi";
  }

}
