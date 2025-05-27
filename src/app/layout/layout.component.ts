import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MovieRowsComponent } from '../movie-rows/movie-rows.component';
import { TopBannerComponent } from '../top-banner/top-banner.component';
import { TvShowsComponent } from '../tv-shows/tv-shows.component';
import { MovieInfoComponent } from '../movie-info/movie-info.component';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [ RouterOutlet, HeaderComponent, TopBannerComponent, MovieRowsComponent, TvShowsComponent, MovieInfoComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent
{

}
