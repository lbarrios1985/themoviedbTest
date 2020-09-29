import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenresService {

  private BASE_URL: string;
  private API_KEY: string;
  private CONFIG = 'genre/';
  private CONFIG2 = '/list?api_key='
  public LANG = 'en-US';
  public TYPE: string = 'movie';
  constructor(private http: HttpClient) {
    this.BASE_URL = environment.API_MOVIE_DB;
    this.API_KEY = environment.API_KEY;
  }
  getGenres(): any {
    return this.http.get(
      this.BASE_URL + this.CONFIG + this.TYPE + this.CONFIG2 + this.API_KEY +
      '&language=' + this.LANG
    );
  }
}
