import { Component } from '@angular/core';
import { TopBannerComponent } from "../top-banner/top-banner.component";
import { MovieRowsComponent } from "../movie-rows/movie-rows.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TopBannerComponent, MovieRowsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
