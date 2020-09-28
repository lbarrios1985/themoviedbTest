import { Component, OnInit } from '@angular/core';
// pluggins
import { OwlOptions } from 'ngx-owl-carousel-o';
// Services
import { PopularSeriesService } from '../../services/series/popular-series.service';
// Interfaces
import { GetData } from '../../interfaces/get-data';

@Component({
  selector: 'app-carousel-series',
  templateUrl: './carousel-series.component.html',
  styleUrls: ['./carousel-series.component.scss']
})
export class CarouselSeriesComponent implements OnInit {

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
        items: 3
      },
      940: {
        items: 4
      }
    }
  };

  constructor(
    protected psSeries: PopularSeriesService
    ) { }

  ngOnInit(): void {
    this.psSeries.getPopularSeries()
    .subscribe(
      (data: GetData) => {
        console.log(data);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

}
