import { Routes } from '@angular/router';
import { LoginComponent } from '../../Auth/login/login.component';
import { RegisterComponent } from '../../Auth/register/register.component';


export const AuthLayoutRoutes: Routes = [
    { path: 'login',          component: LoginComponent },
    { path: 'register',       component: RegisterComponent }
];
