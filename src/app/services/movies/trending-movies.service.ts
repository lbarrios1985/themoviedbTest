import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrendingMoviesService {
  private BASE_URL: string;
  private API_KEY: string;
  private TRENDING_MOVIES = 'trending/movies/day?api_key=';
  constructor(private http: HttpClient) {
    this.BASE_URL = environment.API_MOVIE_DB;
    this.API_KEY = environment.API_KEY;
  }

  getTrendingMovies() {
    return this.http.get(this.BASE_URL + this.TRENDING_MOVIES + this.API_KEY);
  }
}
