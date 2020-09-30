import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Services
import { GenresService } from '../../services/genres.service';
// Interfaces
import { GetData } from '../../interfaces/get-data';
import { Movie } from '../../interfaces/movie';
import { Genre } from '../../interfaces/genre';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  detailMovie: Movie;
  listGenres: Genre[] = [];
  showBtnFav: boolean;

  constructor(
    private acRoute: ActivatedRoute,
    private router: Router,
    protected gsGenre: GenresService,
  ) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.detailMovie = this.router.getCurrentNavigation().extras.state.movie;
      this.showButton();
    } else if (localStorage.getItem('detail')){
      this.showButton();
      this.detailMovie = JSON.parse(localStorage.getItem('detail'));
    } else {
      this.showBtnFav = false;
      this.goHome();
      this.clearAll();
    }
  }

  ngOnInit(): void{
    this.getGenres();
  }
  goHome(): void{
    this.router.navigate(['']);
    localStorage.removeItem('detail');
  }
  goFav(): void{
    this.router.navigate(['favorites']);
  }
  // Get Genders movies
  getGenres(): void{
    this.gsGenre.getGenres()
    .subscribe(
      (data: GetData) => {
        this.findGenres(data.genres);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  // Find genders
  findGenres(genres: any[]): void{
    if (localStorage.getItem('detail')){
      const movie = JSON.parse(localStorage.getItem('detail'));
      const genre_ids = movie.genre_ids;
      genre_ids.forEach((id: number) => {
        this.listGenres.push(genres.find((m: { id: number; }) => m.id === id))
      });
      // console.log(this.listGenres);
    }
  }
  clearAll(): void{
    this.detailMovie = {
      poster_path: null,
      adult: false,
      overview: '',
      release_date: '',
      genre_ids: [],
      id: '',
      original_title: '',
      original_language: '',
      title: '',
      backdrop_path: null,
      popularity: 0,
      vote_count: 0,
      video: false,
      vote_average: 0
    };
    this.listGenres = [];
  }
  addFavorite(): void{
    let fav: Movie[] = [];
    if (localStorage.getItem('fav')){
      fav = JSON.parse(localStorage.getItem('fav'));
      const found = fav.find(m => m.id === this.detailMovie.id);
      if (found === undefined) {
        fav.push(this.detailMovie);
        localStorage.setItem('fav', JSON.stringify(fav));
        this.showBtnFav = false;
      }
    } else {
      fav.push(this.detailMovie);
      localStorage.setItem('fav', JSON.stringify(fav));
      this.showBtnFav = false;
    }
  }
  showButton(): void{
    const found = this.findMovie();
    this.showBtnFav = found !== 'same' ? true : false;
  }

  findMovie(): string{
    if (localStorage.getItem('fav')){
      const fav = JSON.parse(localStorage.getItem('fav'));
      const found = fav.find((m: { id: string | number; }) => m.id === this.detailMovie.id);
      if (found === undefined) {
        return 'update'
      } else {
        return 'same';
      }
    } else {
      return 'create';
    }
  }
}
