import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Interfaces
import { Movie } from '../../interfaces/movie';
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  listFavorites: Movie[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.favorites();
  }

  favorites(): void{
    if (localStorage.getItem('fav')){
      this.listFavorites = JSON.parse(localStorage.getItem('fav'));
    } else {
      this.listFavorites = [];
    }
  }
  removeFav(item: Movie): void{
    this.listFavorites.splice(this.listFavorites.indexOf(item), 1);
    localStorage.setItem('fav', JSON.stringify(this.listFavorites));
  }
  goHome(): void{
    this.router.navigate(['']);
  }
}
