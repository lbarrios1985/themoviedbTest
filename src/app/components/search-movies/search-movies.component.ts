import { Component, OnInit } from '@angular/core';
// Services
import { SearchMoviesService } from '../../services/movies/search-movies.service';
// Interfaces
import { GetData } from '../../interfaces/get-data';
import { Movie } from '../../interfaces/movie';

import { environment } from '../../../environments/environment';


interface Search {
  movie:string;
}

@Component({
  selector: 'app-search-movies',
  templateUrl: './search-movies.component.html',
  styleUrls: ['./search-movies.component.scss']
})

export class SearchMoviesComponent implements OnInit {
  listMovies: Movie[] = [];
  searchMovie: string;

  constructor(protected ssMovies: SearchMoviesService) { }

  ngOnInit(): void {
  }

  searchMovies(f:Search){
    let text = f.movie;
    console.log('test', text)
    this.ssMovies.searchMovies(text)
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
