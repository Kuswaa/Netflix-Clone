import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private baseUrl = environment.tmdbBaseUrl;
  private apiKey = environment.tmdbApiKey;

  constructor(private http: HttpClient) {}

  // Movies
  getPopularMovies(): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/popular?api_key=${this.apiKey}`);
  }

  getTopRatedMovies(): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/top_rated?api_key=${this.apiKey}&language=en-US&page=1`);
  }

  getNewMovies(): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/now_playing?api_key=${this.apiKey}`);
  }

  getMovieDetails(movieId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/${movieId}?api_key=${this.apiKey}&append_to_response=release_dates`);
  }

  getMovieCredits(movieId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/${movieId}/credits?api_key=${this.apiKey}`);
  }

  getGenres(): Observable<any> {
    return this.http.get(`${this.baseUrl}/genre/movie/list?api_key=${this.apiKey}&language=en-US`);
  }

  getMoviesByGenre(genreId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/discover/movie?api_key=${this.apiKey}&with_genres=${genreId}`);
  }

  // TV Shows
  getPopularTvShows(): Observable<any> {
    return this.http.get(`${this.baseUrl}/tv/popular?api_key=${this.apiKey}&language=en-US&page=1`);
  }

  getTopRatedTvShows(): Observable<any> {
    return this.http.get(`${this.baseUrl}/tv/top_rated?api_key=${this.apiKey}&language=en-US&page=1`);
  }

  getNewTvShows(): Observable<any> {
    return this.http.get(`${this.baseUrl}/tv/on_the_air?api_key=${this.apiKey}`);
  }

  getTvShowDetails(tvId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/tv/${tvId}?api_key=${this.apiKey}&append_to_response=content_ratings`);
  }

  getTvShowCredits(tvId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/tv/${tvId}/credits?api_key=${this.apiKey}`);
  }

  getTvGenres(): Observable<any> {
    return this.http.get(`${this.baseUrl}/genre/tv/list?api_key=${this.apiKey}&language=en-US`);
  }

  getTvShowsByGenre(genreId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/discover/tv?api_key=${this.apiKey}&with_genres=${genreId}`);
  }
}