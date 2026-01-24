import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './_auth/login/login.component';
import { ProfileComponent } from './user/profile/profile.component';
import { RegisterComponent } from './_auth/register/register.component';

export const routes: Routes = [
    { path : '', component: DashboardComponent},
    { path : 'dashboard', redirectTo: '', pathMatch: 'full'},
    { path : 'login', component: LoginComponent},
    { path : 'profile', component: ProfileComponent},
    { path : 'register', component: RegisterComponent}
];
