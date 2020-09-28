import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Components
import { CarouselMoviesComponent } from './components/carousel-movies/carousel-movies.component';
import { CarouselSeriesComponent } from './components/carousel-series/carousel-series.component';
// Pluggins
import { CarouselModule } from 'ngx-owl-carousel-o';
import { TopRatedMoviesComponent } from './components/top-rated-movies/top-rated-movies.component';

@NgModule({
  declarations: [
    AppComponent,
    CarouselMoviesComponent,
    CarouselSeriesComponent,
    TopRatedMoviesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
