import { Component, OnInit } from '@angular/core';
// pluggins
import { OwlOptions } from 'ngx-owl-carousel-o';
// Service
import { TrendingMoviesService } from '../../services/movies/trending-movies.service';
import { ConfigService } from '../../services/config.service';
// Interfaces
import { GetData } from '../../interfaces/get-data';
import { Movie } from '../../interfaces/movie';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-carousel-movies',
  templateUrl: './carousel-movies.component.html',
  styleUrls: ['./carousel-movies.component.scss']
})

export class CarouselMoviesComponent implements OnInit {
  trendingMovies: Movie[] = [];
  API_BASE_IMAGE: string;
  imageSize: string;

  customOptions: OwlOptions = {
    autoplay : true,
    autoplayTimeout: 3000,
    loop: true,
    center: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    nav: false,
    navSpeed: 1,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 4
      },
      940: {
        items: 4
      }
    }
  };

  constructor(
    protected tsMovies: TrendingMoviesService,
    protected Config: ConfigService
    ) {
      this.API_BASE_IMAGE = environment.API_BASE_IMAGE;
    }


  ngOnInit(): void {
    this.tsMovies.getTrendingMovies()
    .subscribe(
      (data: GetData) => {
        this.imageSize = 'w500';
        for (let i = 0; i < 10; i++) {
          data.results[i].poster_path = this.API_BASE_IMAGE + this.imageSize + data.results[i].poster_path;
          data.results[i].backdrop_path = this.API_BASE_IMAGE + this.imageSize + data.results[i].backdrop_path;
          this.trendingMovies.push(data.results[i]);
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

}

