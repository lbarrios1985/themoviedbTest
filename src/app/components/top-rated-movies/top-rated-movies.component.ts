import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
// pluggins
import { OwlOptions } from 'ngx-owl-carousel-o';
// Service
import { TopRatedMoviesService } from '../../services/movies/top-rated-movies.service';
// Interfaces
import { GetData } from '../../interfaces/get-data';
import { Movie } from '../../interfaces/movie';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-top-rated-movies',
  templateUrl: './top-rated-movies.component.html',
  styleUrls: ['./top-rated-movies.component.scss']
})
export class TopRatedMoviesComponent implements OnInit {
  topRatedMovies: Movie[] = [];
  API_BASE_IMAGE: string;
  imageSize: string;

  constructor(
    protected trsMovies: TopRatedMoviesService,
    private router: Router
  ) {
    this.API_BASE_IMAGE = environment.API_BASE_IMAGE;
   }

  ngOnInit(): void {
    this.trsMovies.getTopRatedMovies()
    .subscribe(
      (data: GetData) => {
        this.imageSize = 'w500';
        for (let i = 0; i < 4; i++) {
          data.results[i].poster_path = this.API_BASE_IMAGE + this.imageSize + data.results[i].poster_path;
          data.results[i].backdrop_path = this.API_BASE_IMAGE + this.imageSize + data.results[i].backdrop_path;
          this.topRatedMovies.push(data.results[i]);
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  redirect(item:Movie) {
    this.router.navigate(['/detail'],{state:{movie: item}});
  }

}
