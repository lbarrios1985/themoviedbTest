import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Componets
import { HomeComponent } from './components/home/home.component';
import { DetailsComponent } from './components/details/details.component';
import { FavoritesComponent } from './components/favorites/favorites.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'detail', component: DetailsComponent },
  { path: 'favorites', component: FavoritesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
