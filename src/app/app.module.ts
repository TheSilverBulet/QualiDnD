import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { LoaderComponent } from './loader/loader.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginService } from './shared/login.service';
import { AuthGuard } from './authorization/auth-guard.service';
import { AuthService } from './authorization/auth.service';
import { UserService } from './shared/user.service';
import { RouterModule } from '@angular/router';
import { LoaderInterceptor } from './loader-interceptor.service';
import { RoleGuard } from './authorization/role-guard.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MaterialImportModule } from './material-import/material-import.module';
import { AppToolbarComponent } from './app-toolbar/app-toolbar.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { ChangesComponent } from './changes/changes.component';
import { InitiativeTableComponent } from './initiative-table/initiative-table.component';
import { DashboardCharacterComponent } from './dashboard-character/dashboard-character.component';
import { DashboardCharacterExpandedDialogComponent } from './dashboard-character-expanded-dialog/dashboard-character-expanded-dialog.component';
import { CharacterCreationDialogComponent } from './character-creation-dialog/character-creation-dialog.component';
import { ResetPasswordDialogComponent } from './reset-password-dialog/reset-password-dialog.component';
import { UpdateAttributeDialogComponent } from './update-attribute-dialog/update-attribute-dialog.component';
import { DiceRollerDialogComponent } from './dice-roller-dialog/dice-roller-dialog.component';
import { ReferenceDialogComponent } from './reference-dialog/reference-dialog.component';
import { UtilityService } from './shared/utility.service';
import { EditCharacterDialogComponent } from './edit-character-dialog/edit-character-dialog.component';
import { AbilitySearchComponent } from './ability-search/ability-search.component';
import { RecordKeepingComponent } from './record-keeping/record-keeping.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { InitiativeDetailsDialogComponent } from './initiative-details-dialog/initiative-details-dialog.component';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    LoaderComponent,
    PageNotFoundComponent,
    AppToolbarComponent,
    RegistrationComponent,
    UserComponent,
    AdminComponent,
    ChangesComponent,
    InitiativeTableComponent,
    DashboardCharacterComponent,
    DashboardCharacterExpandedDialogComponent,
    CharacterCreationDialogComponent,
    ResetPasswordDialogComponent,
    UpdateAttributeDialogComponent,
    DiceRollerDialogComponent,
    ReferenceDialogComponent,
    EditCharacterDialogComponent,
    AbilitySearchComponent,
    RecordKeepingComponent,
    SafeHtmlPipe,
    InitiativeDetailsDialogComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    MaterialImportModule
  ],
  providers: [
    { provide: 'authGuard', useClass: AuthGuard },
    { provide: 'authService', useClass: AuthService },
    { provide: 'roleGuardService', useClass: RoleGuard },
    { provide: 'userService', useClass: UserService },
    { provide: 'loginService', useClass: LoginService },
    { provide: 'loaderService', useClass: LoaderComponent },
    { provide: 'utilityService', useClass: UtilityService },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    SafeHtmlPipe],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
