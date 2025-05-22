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
export class MovieRowsComponent implements OnInit
{
  genres: any[] = [];
  genreMovies: { genreName: string, movies: any[] }[] = [];
  imageBaseUrl = environment.tmdbImageUrl;

  hoveredMovie: any = null;
  closeTimeout: any = null;

  constructor(private moviesService: MoviesService, private http: HttpClient) {}

  ngOnInit(): void {
    this.moviesService.getGenres().subscribe((response: any) => {
      const blockedGenres = ['Documentary'];

      this.genres = response.genres.filter((genre: any) => !blockedGenres.includes(genre.name));

      console.log(this.genres, 'debugger');
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
        console.log(response.results);
      });
    });
  }

  openModal(movie: any, event: MouseEvent)
  {
    this.hoveredMovie = { ...movie }; 
    this.cancelCloseTimer();

    this.moviesService.getMovieDetails(movie.id).subscribe((details: any) => {
      const releaseInfo = details.release_dates.results.find((r: any) => r.iso_3166_1 === 'US');
      const cert = releaseInfo?.release_dates?.[0]?.certification || 'NR';
      this.hoveredMovie.certification = cert;
      this.hoveredMovie.genre = details.genres.map((g: any) => g.name).join(', ');
    });

    this.moviesService.getMovieCredits(movie.id).subscribe((credits: any) => {
      const topCast = credits.cast.slice(0, 4).map((c: any) => c.name).join(', ');
      this.hoveredMovie.cast = topCast;
    });
  }

  startCloseTimer()
  {
    this.closeTimeout = setTimeout(() => {
      this.hoveredMovie = null;
    }, 300);
  }

  cancelCloseTimer()
  {
    if (this.closeTimeout)
    {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = null;
    }
  }
}
