import { Component } from '@angular/core';
import { NotificationComponent } from "./notification/notification.component";
import { AppToolbarComponent } from "./app-toolbar/app-toolbar.component";
import { LoaderComponent } from "./loader/loader.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [NotificationComponent, AppToolbarComponent, LoaderComponent, RouterOutlet]
})
export class AppComponent {
  title = 'QualiDnD';
}
