import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Router} from '@angular/router';
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

  @Output() firstTrendingMovie: EventEmitter<Movie> =   new EventEmitter();

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
    protected Config: ConfigService,
    private router: Router
    ) {
      this.API_BASE_IMAGE = environment.API_BASE_IMAGE;
    }


  ngOnInit(): void {
    this.tsMovies.getTrendingMovies()
    .subscribe(
      (data: GetData) => {
        const count = data.results.length >= 10 ? 10 : data.results.length;
        if (count === 0) {
          this.trendingMovies = [];
        } else {
          this.imageSize = 'w500';
          for (let i = 0; i < 10; i++) {
            data.results[i].poster_path = this.imgReturn(data.results[i].poster_path);
            data.results[i].backdrop_path = this.imgReturn(data.results[i].backdrop_path);
            if ( i === 0 ) {
              this.firstTrendingMovie.emit(data.results[0]);
            }
            this.trendingMovies.push(data.results[i]);
          }
          // console.log(data.results[0].backdrop_path)
          // console.log(data.results[0].poster_path)
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  redirect(item: Movie): void {
    this.router.navigate(['/detail'], { state: { movie: item}});
  }

  imgReturn(img: string): string {
    if (img !== undefined && img !== null && img !== '') {
      return this.API_BASE_IMAGE + this.imageSize + img;
    } else {
      return '/assets/image/empy.png';
    }
  }

}

