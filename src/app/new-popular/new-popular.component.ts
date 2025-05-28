import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environments';
import { MoviesService } from '../movies.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-new-popular',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './new-popular.component.html',
  styleUrls: ['./new-popular.component.css']
})
export class NewPopularComponent implements OnInit {
  imageBaseUrl = environment.tmdbImageUrl;

  newMovies: any[] = [];
  popularMovies: any[] = [];
  newTvShows: any[] = [];
  popularTvShows: any[] = [];

  allSections: any[] = [];

  hoveredMovie: any = null;
  closeTimeout: any = null;

  constructor(private moviesService: MoviesService, private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchAllSections();
  }

  fetchAllSections(): void {
    this.moviesService.getNewMovies().subscribe((res: any) => {
      this.newMovies = res.results.filter((i: any) => i.backdrop_path);
      this.updateSections();
    });

    this.moviesService.getPopularMovies().subscribe((res: any) => {
      this.popularMovies = res.results.filter((i: any) => i.backdrop_path);
      this.updateSections();
    });

    this.moviesService.getNewTvShows().subscribe((res: any) => {
      this.newTvShows = res.results.filter((i: any) => i.backdrop_path);
      this.updateSections();
    });

    this.moviesService.getPopularTvShows().subscribe((res: any) => {
      this.popularTvShows = res.results.filter((i: any) => i.backdrop_path);
      this.updateSections();
    });
  }

  updateSections(): void {
    this.allSections = [
      { title: 'New Movies', items: this.newMovies, type: 'movie' },
      { title: 'Popular Movies', items: this.popularMovies, type: 'movie' },
      { title: 'New TV Series', items: this.newTvShows, type: 'tv' },
      { title: 'Popular TV Series', items: this.popularTvShows, type: 'tv' }
    ];
  }

  openModal(item: any, event: MouseEvent, type: string): void {
    this.hoveredMovie = { ...item };
    this.cancelCloseTimer();

    const details$ = type === 'movie'
      ? this.moviesService.getMovieDetails(item.id)
      : this.moviesService.getTvShowDetails(item.id);

    const credits$ = type === 'movie'
      ? this.moviesService.getMovieCredits(item.id)
      : this.moviesService.getTvShowCredits(item.id);

    details$.subscribe((details: any) => {
      const usRating = type === 'movie'
        ? details.release_dates.results.find((r: any) => r.iso_3166_1 === 'US')
        : details.content_ratings.results.find((r: any) => r.iso_3166_1 === 'US');

      const cert = type === 'movie'
        ? usRating?.release_dates?.[0]?.certification || 'NR'
        : usRating?.rating || 'NR';

      this.hoveredMovie.certification = cert;
      this.hoveredMovie.genre = details.genres.map((g: any) => g.name).join(', ');
      this.hoveredMovie.overview = details.overview;
    });

    credits$.subscribe((credits: any) => {
      const topCast = credits.cast.slice(0, 4).map((c: any) => c.name).join(', ');
      this.hoveredMovie.cast = topCast;
    });
  }

  startCloseTimer(): void {
    this.closeTimeout = setTimeout(() => {
      this.hoveredMovie = null;
    }, 300);
  }

  cancelCloseTimer(): void {
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = null;
    }
  }
}
