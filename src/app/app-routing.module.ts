import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './film-catalog/main/main.component';
import { FilmsListComponent } from './film-catalog/films-list/films-list.component';
import {ActorsListComponent} from "./film-catalog/actors-list/actors-list.component";
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";
import {AuthGuard} from "./shared/services/auth.guard";
import {FilmDetailComponent} from "./film-catalog/film-detail/film-detail.component";
import {ActorDetailComponent} from "./film-catalog/actor-detail/actor-detail.component";
import {PageNotFoundComponent} from "./film-catalog/page-not-found/page-not-found.component";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "main" },
  { path: "main", component: MainComponent, canActivate: [AuthGuard] },
  { path: "films-list", component: FilmsListComponent, canActivate: [AuthGuard]},
  { path: "actors-list", component: ActorsListComponent, canActivate: [AuthGuard]},
  { path: "login", component: LoginComponent},
  { path: "registration", component: RegistrationComponent},
  { path: "film-detail/:id", component: FilmDetailComponent, canActivate: [AuthGuard]},
  { path: "actor-detail/:id", component: ActorDetailComponent, canActivate: [AuthGuard]},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
