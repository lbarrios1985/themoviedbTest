import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TopRatedMoviesService {

  private BASE_URL: string;
  private API_KEY: string;
  private TOP_RETED_MOVIES = '/movie/top_rated?api_key=';
  public LANG = 'en-US';
  public PAGE = 1;
  constructor(private http: HttpClient) {
    this.BASE_URL = environment.API_MOVIE_DB;
    this.API_KEY = environment.API_KEY;
  }

  getTopRatedMovies(): any {
    return this.http.get(
      this.BASE_URL + this.TOP_RETED_MOVIES + this.API_KEY +
      '&language=' + this.LANG + '&page=' + this.PAGE
    );
  }
}
