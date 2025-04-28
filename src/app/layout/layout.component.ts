import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MovieRowsComponent } from '../movie-rows/movie-rows.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent, MovieRowsComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
