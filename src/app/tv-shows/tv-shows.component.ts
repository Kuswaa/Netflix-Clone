import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environments';
import { MoviesService } from '../movies.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tv-shows',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tv-shows.component.html',
  styleUrl: './tv-shows.component.css'
})
export class TvShowsComponent implements OnInit {
  genres: any[] = [];
  genreTvShows: { genreName: string, tvShows: any[] }[] = [];
  imageBaseUrl = environment.tmdbImageUrl;

  hoveredTVShow: any = null;
  closeTimeout: any = null;

  constructor(private moviesService: MoviesService, private http: HttpClient) {}

  ngOnInit(): void {
    this.moviesService.getTvGenres().subscribe((response: any) => {
      const blockedGenres = ['Documentary'];
      this.genres = response.genres.filter((genre: any) => !blockedGenres.includes(genre.name));
      this.fetchTvShowsForAllGenres();
    });
  }

  fetchTvShowsForAllGenres(): void {
    this.genres.forEach(genre => {
      this.moviesService.getTvShowsByGenre(genre.id).subscribe((response: any) => {
        this.genreTvShows.push({
          genreName: genre.name,
          tvShows: response.results
        });
      });
    });
  }

  openModal(tvShow: any, event: MouseEvent) {
    this.hoveredTVShow = { ...tvShow };
    this.cancelCloseTimer();

    this.moviesService.getTvShowDetails(tvShow.id).subscribe((details: any) => {
      const usRating = details.content_ratings.results.find((r: any) => r.iso_3166_1 === 'US');
      const cert = usRating?.rating || 'NR';
      this.hoveredTVShow.certification = cert;
      this.hoveredTVShow.genre = details.genres.map((g: any) => g.name).join(', ');
    });

    this.moviesService.getTvShowCredits(tvShow.id).subscribe((credits: any) => {
      const topCast = credits.cast.slice(0, 4).map((c: any) => c.name).join(', ');
      this.hoveredTVShow.cast = topCast;
    });
  }

  startCloseTimer() {
    this.closeTimeout = setTimeout(() => {
      this.hoveredTVShow = null;
    }, 300);
  }

  cancelCloseTimer() {
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = null;
    }
  }
}
