import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
    {
        path: "login",
        component: LoginComponent,
        title: "Login"
    },
    {
        path: "register",
        component: RegistrationComponent,
        title: "Register"
    },
    {
        path: "",
        component: DashboardComponent,
        canActivate: [authGuard]
    },
    {
        path: "dashboard",
        component: DashboardComponent,
        canActivate: [authGuard],
        title: "Dashboard"
    }
];
