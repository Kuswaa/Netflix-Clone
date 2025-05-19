import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { PinlockComponent } from './auth/pinlock/pinlock.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

export const routes: Routes =
[
    { path: '', component: SignupComponent },
    { path: 'login', component: LoginComponent },
    { path: 'profiles', component: ProfileComponent },
    { path: 'pinlock', component: PinlockComponent },
    { path: 'browse',
        component: LayoutComponent
        // children:
        // [
        //     { path: '', component: HomeComponent },
        //     { path: 'movie/:id', component: MovieDetailsComponent },
        // ]
    },
];


