import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environments';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-top-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-banner.component.html',
  styleUrl: './top-banner.component.css'
})
export class TopBannerComponent implements OnInit {

  randomMovie: any = null;
  imageBaseUrl = environment.tmdbImageUrl;
  certification: string = '';

  constructor(private moviesService: MoviesService, private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchRandomMovie();
  }

  fetchRandomMovie(): void {
    this.moviesService.getPopularMovies().subscribe((response: any) => {
      const movies = response.results;
      const randomIndex = Math.floor(Math.random() * movies.length);
      this.randomMovie = movies[randomIndex];

      console.log('This is the random movie', this.randomMovie);

      this.fetchCertification(this.randomMovie.id);
    });
  }

  fetchCertification(movieId: number): void {
    this.http.get(`https://api.themoviedb.org/3/movie/${movieId}/release_dates?api_key=${environment.tmdbApiKey}`)
      .subscribe((data: any) => {
        const results = data?.results;
        const usRelease = results?.find((entry: any) => entry.iso_3166_1 === 'US');
        const certificationEntry = usRelease?.release_dates?.[0];
        this.certification = certificationEntry?.certification || 'NR';
        console.log('Certification:', this.certification);
      });
  }
}
