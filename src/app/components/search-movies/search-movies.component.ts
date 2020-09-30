import { Component, OnInit, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
// Services
import { SearchMoviesService } from '../../services/movies/search-movies.service';
// Interfaces
import { GetData } from '../../interfaces/get-data';
import { Movie } from '../../interfaces/movie';

import { environment } from '../../../environments/environment';
// Pluggins
import { NgxSpinnerService } from "ngx-spinner";
import { async } from 'rxjs/internal/scheduler/async';

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
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    this.API_BASE_IMAGE = environment.API_BASE_IMAGE;
  }

  ngOnInit(): void {
  }
  /**
   * Function by Search movies
  */
  searchMovies(f: Search): void{
    const text = f.movie;
    const error = document.getElementById('error_search');
    if (text !== undefined) {
      if (text.length > 0 ) {
        this.showSpinner();
        this.ssMovies.searchMovies(text)
        .subscribe(
          (data: GetData) => {
            this.imageSize = 'w500';
            const count = data.results.length >= 9 ? 9 : data.results.length;
            this.listMovies = [];
            if (count === 0) {
              error.innerHTML = 'Movie not found, sorry!';
            } else {
              for (let i = 0; i < count; i++) {
                let poster = data.results[i].poster_path;
                let backdrop = data.results[i].backdrop_path;
                data.results[i].poster_path = this.imgReturn(poster, 'poster');
                data.results[i].backdrop_path = this.imgReturn(backdrop, 'backdrop');
                this.listMovies.push(data.results[i]);
              }
            }
            this.spinner.hide();
          },
          // tslint:disable-next-line: no-shadowed-variable
          (error: any) => {
            console.error(error);
            error.innerHTML = 'Something went wrong';
            this.spinner.hide();
          }
        );
      } else {
        error.innerHTML = 'The search field is empty';
      }
    } else{
      error.innerHTML = 'You need write something';
    }
  }
  /**
   * Function by clear all
  */
  clearSearch(): void{
    const error = document.getElementById('error_search');
    const input = document.getElementById('search');
    input.addEventListener('search', (event): void => {
      this.listMovies = [];
      error.innerHTML = '';
    });
  }
  /**
   * Function by redirect to home
  */
  redirect(item: Movie): void {
    this.listMovies = [];
    this.router.navigate(['/detail'], {state: { movie: item}});
  }
  /**
   * Spinner Function
  */
  showSpinner(): void {
    this.spinner.show(undefined,
      {
        type: 'ball-clip-rotate-multiple',
        size: 'medium',
        bdColor: 'rgba(255,255,255, 0.3)',
        color: 'white',
        fullScreen: true
      }
    );
  }
  /**
   * Function to test the spinner
  */
  testSpiner(): void{
    this.showSpinner();
    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
  }

  imgReturn(img: string, typePath: string): string {
    if (img !== null && img !== undefined) {
      return this.API_BASE_IMAGE + this.imageSize + img;
    } else if (typePath === 'backdrop'){
      return '/assets/image/empy.png';
    } else if (typePath === 'poster'){
      return '/assets/image/poster_empy.png';
    } else {
      this.spinner.hide();
    }
  }
}
