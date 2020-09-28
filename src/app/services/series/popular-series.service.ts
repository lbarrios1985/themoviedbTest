import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PopularSeriesService {

  private BASE_URL: string;
  private API_KEY: string;
  private POPULAR_SERIES = 'tv/popular?api_key=';
  public LANG = 'en-US';
  public PAGE = 1;
  constructor(private http: HttpClient) {
    this.BASE_URL = environment.API_MOVIE_DB;
    this.API_KEY = environment.API_KEY;
  }

  getPopularSeries(): any {
    return this.http.get(
      this.BASE_URL + this.POPULAR_SERIES + this.API_KEY +
      '&language=' + this.LANG + '&page=' + this.PAGE
    );
  }
}
