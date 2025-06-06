import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { PinlockComponent } from './auth/pinlock/pinlock.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { TvShowsComponent } from './tv-shows/tv-shows.component';
import { MovieInfoComponent } from './movie-info/movie-info.component';
import { MovieRowsComponent } from './movie-rows/movie-rows.component';
import { HomeComponent } from './home/home.component';
import { NewPopularComponent } from './new-popular/new-popular.component';
import { MyListComponent } from './my-list/my-list.component';
import { LanguagesComponent } from './languages/languages.component';

export const routes: Routes =
[
    { path: '', component: SignupComponent },
    { path: 'login', component: LoginComponent },
    { path: 'profiles', component: ProfileComponent },
    { path: 'pinlock', component: PinlockComponent },
    {
    path: 'browse',
    component: LayoutComponent,
    children: [
        { path: '', component: HomeComponent },
        { path: 'tv-shows', component: TvShowsComponent },
        { path: 'movies', component: MovieRowsComponent },
        { path: 'new-and-popular', component: NewPopularComponent },
        { path: 'my-list', component: MyListComponent },
        { path: 'languages', component: LanguagesComponent },
    ]
    },
];


