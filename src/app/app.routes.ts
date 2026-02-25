import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './_auth/login/login.component';
import { ProfileComponent } from './user/profile/profile.component';
import { RegisterComponent } from './_auth/register/register.component';
import { VerifyOtpComponent } from './_auth/verify-otp/verify-otp.component';
import { RoomsComponent } from './_listings/rooms/rooms.component';
import { RoommatesComponent } from './_listings/roommates/roommates.component';
import { RoomDetailsComponent } from './_listings/room-details/room-details.component';
import { RoommateDetailsComponent } from './_listings/roommate-details/roommate-details.component';

export const routes: Routes = [
    { path : '', component: DashboardComponent},
    { path : 'dashboard', redirectTo: '', pathMatch: 'full'},
    { path : 'login', component: LoginComponent},
    { path : 'profile', component: ProfileComponent},
    { path : 'register', component: RegisterComponent},
    { path : 'verify-otp', component: VerifyOtpComponent},
    { path : 'rooms', component: RoomsComponent},
    { path : 'roommates', component: RoommatesComponent},
    { path: 'rooms/:id', component: RoomDetailsComponent},
    { path: 'roommates/:id', component: RoommateDetailsComponent}
];
