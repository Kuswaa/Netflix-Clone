import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MoviesService
{
  private baseUrl = environment.tmdbBaseUrl;
  private apiKey = environment.tmdbApiKey;

  constructor(private http: HttpClient) {}

  getPopularMovies(): Observable<any> {
    const url = `${environment.tmdbBaseUrl}/movie/popular?api_key=${environment.tmdbApiKey}`;
    return this.http.get(url);
  }

  getTopRatedMovies(): Observable<any> {
    const url = `${this.baseUrl}/movie/top_rated?api_key=${this.apiKey}&language=en-US&page=1`;
    return this.http.get(url);
  }

  getGenres() {
    return this.http.get<any>(`${this.baseUrl}/genre/movie/list?api_key=${this.apiKey}&language=en-US`);
  }

  getMoviesByGenre(genreId: number) {
    return this.http.get<any>(`${this.baseUrl}/discover/movie?api_key=${this.apiKey}&with_genres=${genreId}`);
  }

  getMovieDetails(movieId: number) {
  const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${environment.tmdbApiKey}&append_to_response=release_dates`;
  return this.http.get(apiUrl);
  }

  getMovieCredits(movieId: number) {
    const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${environment.tmdbApiKey}`;
    return this.http.get(apiUrl);
  }
}
