import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MovieRowsComponent } from '../movie-rows/movie-rows.component';
import { TopBannerComponent } from '../top-banner/top-banner.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent, TopBannerComponent, MovieRowsComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent
{

}
