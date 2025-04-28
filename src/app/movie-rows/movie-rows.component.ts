import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environments';
import { MoviesService } from '../movies.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-movie-rows',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-rows.component.html',
  styleUrls: ['./movie-rows.component.css']
})
export class MovieRowsComponent implements OnInit {
  
  genres: any[] = [];

  genreMovies: { genreName: string, movies: any[] }[] = [];

  imageBaseUrl = environment.tmdbImageUrl;

  constructor(private moviesService: MoviesService, private http: HttpClient) {}

  ngOnInit(): void {
    this.moviesService.getGenres().subscribe((response: any) => {
      this.genres = response.genres;
      this.fetchMoviesForAllGenres();
    });
  }

  fetchMoviesForAllGenres(): void {
    this.genres.forEach(genre => {
      this.moviesService.getMoviesByGenre(genre.id).subscribe((response: any) => {
        this.genreMovies.push({
          genreName: genre.name,
          movies: response.results
        });
      });
    });
  }
}
