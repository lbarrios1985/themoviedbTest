import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router,) { }

  ngOnInit(): void {
  }
  getTrendingMovie(item: Movie): void{
    // console.log(item);
    this.posterPath = item.poster_path;
    this.backdropPath = item.backdrop_path;
    this.titleTredingMovie = item.title;
  }
  goFav(): void{
    this.router.navigate(['favorites']);
  }
}
