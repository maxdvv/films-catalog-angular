import { Component, OnInit } from '@angular/core';
import {Film} from "../../film";
import {FilmService} from "../film.service";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  filmsData: Film[] = [];
  actorsData: Film[] = [];
  isLoading: boolean = false
  isMain: boolean = true

  favFilms: [] = []


  constructor(
    public filmsService: FilmService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.fetchFilms()
    this.fetchActors()
  }

  fetchFilms() {
    this.isLoading = true

    this.getFavourite()

    this.filmsService.getPopularFilms().subscribe(
      (filmList: any) => {
        this.filmsData = filmList.results.slice(15,18)
        this.isLoading = false
      },
      err => {
        console.log("error");
      })

  }

  fetchActors() {
    this.isLoading = true
    this.filmsService.getPopularActors().subscribe(
      (filmList: any) => {
        this.actorsData = filmList.results.slice(15,18)
        this.isLoading = false
      },
      err => {
        console.log("error");
      })
  }

  getFavourite() {
    const accountId = this.authService.userId
    const sessionId = this.authService.sessionId
    this.filmsService.getFavoriteMovies(accountId, sessionId)
      .subscribe(
        (filmList: any) => {
          this.favFilms = filmList.results.map((film: { id: any }) => {
            return film.id
          })
        })

    console.log(this.favFilms)
  }

}
