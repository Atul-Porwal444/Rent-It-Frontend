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
import { SavedPostsComponent } from './user/saved-posts/saved-posts.component';
import { SettingsComponent } from './user/settings/settings.component';
import { MyPostsComponent } from './user/my-posts/my-posts.component';
import { HomeComponent } from './home/home.component';
import { ForgotPasswordComponent } from './_auth/forgot-password/forgot-password.component';
import { authGuard } from './_guards/auth.guard';

export const routes: Routes = [
    { path : '', component: HomeComponent},
    { path : 'login', component: LoginComponent},
    { path : 'register', component: RegisterComponent},
    { path : 'verify-otp', component: VerifyOtpComponent},
    { path: 'roommates/:id', component: RoommateDetailsComponent, canActivate: [authGuard]},
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path : 'dashboard', component: DashboardComponent, canActivate: [authGuard]},
    { path : 'profile', component: ProfileComponent, canActivate: [authGuard]},
    { path : 'rooms', component: RoomsComponent, canActivate: [authGuard]},
    { path : 'roommates', component: RoommatesComponent, canActivate: [authGuard]},
    { path: 'rooms/:id', component: RoomDetailsComponent, canActivate: [authGuard]},
    { path: 'saved-posts', component: SavedPostsComponent, canActivate: [authGuard] },
    { path: 'settings', component: SettingsComponent, canActivate: [authGuard] },
    { path:'my-posts', component: MyPostsComponent, canActivate: [authGuard] },

    { path: '**', redirectTo: '' }
];
