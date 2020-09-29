import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchMoviesService {

  private BASE_URL: string;
  private API_KEY: string;
  private SEARCH_MOVIES = 'search/movie?api_key=';

  public LANG = 'en-US';
  public PAGE = 1;
  public QUERY: string;
  public ADULT: boolean;
  public REGION: string;
  public YEAR: number|string;

  constructor(private http: HttpClient) {
    this.BASE_URL = environment.API_MOVIE_DB;
    this.API_KEY = environment.API_KEY;
  }

  searchMovies(q: string): any {
    this.QUERY = q.replace(/ /g, "%20");
    let url =  this.BASE_URL + this.SEARCH_MOVIES + this.API_KEY +
    '&language=' + this.LANG + '&page=' + this.PAGE + '&query=' + this.QUERY;
    return this.http.get(url);
  }
}
