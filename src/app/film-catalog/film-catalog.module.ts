import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main/main.component';
import {FilmsListComponent} from './films-list/films-list.component';
import {FormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FilmItemComponent} from './film-item/film-item.component';
import { HttpClientModule } from '@angular/common/http';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { SearchFilmComponent } from './search-film/search-film.component';
import {MatInputModule} from "@angular/material/input";
import { SearchNamePipe } from './search-name.pipe';
import { ActorsListComponent } from './actors-list/actors-list.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import { FilmDetailComponent } from './film-detail/film-detail.component';
import { ActorDetailComponent } from './actor-detail/actor-detail.component';
import {AppRoutingModule} from "../app-routing.module";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {MatDividerModule} from "@angular/material/divider";

@NgModule({
  imports: [
    AppRoutingModule,
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatSelectModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    HttpClientModule,
  ],
  declarations: [
    MainComponent,
    FilmsListComponent,
    FilmItemComponent,
    SearchFilmComponent,
    SearchNamePipe,
    ActorsListComponent,
    FilmDetailComponent,
    ActorDetailComponent,
    PageNotFoundComponent
  ]
})
export class FilmCatalogModule {
}
