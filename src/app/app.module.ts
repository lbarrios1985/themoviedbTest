import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Components
import { CarouselMoviesComponent } from './components/carousel-movies/carousel-movies.component';
import { CarouselSeriesComponent } from './components/carousel-series/carousel-series.component';
import { TopRatedMoviesComponent } from './components/top-rated-movies/top-rated-movies.component';
import { DetailsComponent } from './components/details/details.component';
import { HomeComponent } from './components/home/home.component';
import { SearchMoviesComponent } from './components/search-movies/search-movies.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
// Pluggins
import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  declarations: [
    AppComponent,
    CarouselMoviesComponent,
    CarouselSeriesComponent,
    TopRatedMoviesComponent,
    DetailsComponent,
    HomeComponent,
    SearchMoviesComponent,
    FavoritesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
