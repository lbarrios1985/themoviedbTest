import { Component, OnInit } from '@angular/core';
// pluggins
import { OwlOptions } from 'ngx-owl-carousel-o';
// Services
import { PopularSeriesService } from '../../services/series/popular-series.service';
// Interfaces
import { GetData } from '../../interfaces/get-data';
import { Serie } from '../../interfaces/serie';
// Environment
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-carousel-series',
  templateUrl: './carousel-series.component.html',
  styleUrls: ['./carousel-series.component.scss']
})
export class CarouselSeriesComponent implements OnInit {
  popularSeries: Serie[] = [];
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
    protected psSeries: PopularSeriesService
    ) {
      this.API_BASE_IMAGE = environment.API_BASE_IMAGE;
    }

  ngOnInit(): void {
    this.psSeries.getPopularSeries()
    .subscribe(
      (data: GetData) => {
        this.imageSize = 'w500';
        for (let i = 0; i < 10; i++) {
          data.results[i].poster_path = this.imgReturn(data.results[i].poster_path);
          data.results[i].backdrop_path = this.imgReturn(data.results[i].backdrop_path);
          this.popularSeries.push(data.results[i]);
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  imgReturn(img: string): string {
    if (img !== undefined && img !== null && img !== '') {
      return this.API_BASE_IMAGE + this.imageSize + img;
    } else {
      return '/assets/image/empy.jpeg';
    }
  }

}
