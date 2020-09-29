import { Component, OnInit, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
// Services
import { SearchMoviesService } from '../../services/movies/search-movies.service';
// Interfaces
import { GetData } from '../../interfaces/get-data';
import { Movie } from '../../interfaces/movie';

import { environment } from '../../../environments/environment';


interface Search {
  movie: string;
}

@Component({
  selector: 'app-search-movies',
  templateUrl: './search-movies.component.html',
  styleUrls: ['./search-movies.component.scss']
})

export class SearchMoviesComponent implements OnInit {
  listMovies: Movie[] = [];
  searchMovie: string;
  API_BASE_IMAGE: string;
  imageSize: string;

  @ViewChild('search', { static: false }) search: any;

  constructor(
    protected ssMovies: SearchMoviesService,
    private router: Router
  ) {
    this.API_BASE_IMAGE = environment.API_BASE_IMAGE;
  }

  ngOnInit(): void {
  }

  searchMovies(f: Search): void{
    const text = f.movie;
    const error = document.getElementById('error_search');
    if (text !== '') {
      this.ssMovies.searchMovies(text)
      .subscribe(
        (data: GetData) => {
          this.imageSize = 'w500';
          const count = data.results.length >= 9 ? 9 : data.results.length;
          this.listMovies = [];
          if (count === 0) {
            error.innerHTML = 'Movie not found, sorry!';
          } else {
            for (let i = 0; i < 9; i++) {
              data.results[i].poster_path = this.API_BASE_IMAGE + this.imageSize + data.results[i].poster_path;
              data.results[i].backdrop_path = this.API_BASE_IMAGE + this.imageSize + data.results[i].backdrop_path;
              this.listMovies.push(data.results[i]);
            }
          }
        },
        // tslint:disable-next-line: no-shadowed-variable
        (error: any) => {
          console.error(error);
        }
      );
    } else{
      error.innerHTML = '';
    }
  }
  clearSearch(): void{
    const error = document.getElementById('error_search');
    const input = document.getElementById('search');
    input.addEventListener('search', (event): void => {
      this.listMovies = [];
      error.innerHTML = '';
    });
  }
  redirect(item: Movie): void {
    this.listMovies = [];
    this.router.navigate(['/detail'], {state: { movie: item}});
  }
}
