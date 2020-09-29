import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Interfaces
import { Movie } from '../../interfaces/movie';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  detailMovie:Movie;

  constructor(
    private acRoute: ActivatedRoute,
    private router: Router
  ) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.detailMovie = this.router.getCurrentNavigation().extras.state.movie;
      localStorage.setItem('detail', JSON.stringify(this.detailMovie));
    } else if (localStorage.getItem('detail')){
      this.detailMovie = JSON.parse(localStorage.getItem('detail'));
    } else {
      this.detailMovie = {
        poster_path: null,
        adult: false,
        overview: "",
        release_date: "",
        genre_ids: [],
        id: "",
        original_title: "",
        original_language: "",
        title: "",
        backdrop_path: null,
        popularity: 0,
        vote_count: 0,
        video: false,
        vote_average: 0
      }
    }
  }

  ngOnInit(): void {
  }

}
