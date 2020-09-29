import { Component, OnInit } from '@angular/core';
// Interfaces
import { Movie } from '../../interfaces/movie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  backdropPath: string;
  posterPath: string;
  titleTredingMovie: string;

  constructor() { }

  ngOnInit(): void {
  }
  getTrendingMovie(item: Movie): void{
    // console.log(item);
    this.posterPath = item.poster_path;
    this.backdropPath = item.backdrop_path;
    this.titleTredingMovie = item.title;
  }

}
