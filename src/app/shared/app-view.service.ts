import { Injectable, HostListener } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppViewService {

  private isMobileResolution: boolean;

  constructor() {
    if (window.innerWidth < 1300) {
      this.isMobileResolution = true;
    } else {
      this.isMobileResolution = false;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth < 1300) {
      this.isMobileResolution = true;
    } else {
      this.isMobileResolution = false;
    }
  }

  public getIsMobileResolution(): boolean {
    return this.isMobileResolution;
  }
}
