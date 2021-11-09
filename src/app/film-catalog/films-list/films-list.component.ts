import { Component, OnInit } from '@angular/core';
import { FilmService } from '../film.service';
import { AuthService} from "../../shared/services/auth.service";
import { Film } from '../../film';

@Component({
  selector: '.films',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.css']
})
export class FilmsListComponent implements OnInit {
  filmsData: Film[] = []
  favFilms: [] = []
  watchListFilms: [] = []

  counter: number = 0
  favoriteFilmsCount: number = 0
  isLoading: boolean = false
  searchTerm: string = ''
  numLoadFilm: number = 3

  accountId = this.authService.userId
  sessionId = this.authService.sessionId

  constructor(
    public filmsService: FilmService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.fetchFilms()
   }


  setNumLoadFilm() {
    if (this.numLoadFilm < 20) {
      this.numLoadFilm = this.numLoadFilm + 3
      this.fetchFilms()
    }
  }

  fetchFilms() {
    this.isLoading = true

    this.getFavourite()
    this.getWatchList()

    this.filmsService.getPopularFilms().subscribe(
      (filmList: any) => {
        this.filmsData = filmList.results.slice(0,this.numLoadFilm)
        this.isLoading = false
      },
      err => {
        console.log("error");
      })
  }

  setSearchTerm(searchTerm: string) {
    this.searchTerm = searchTerm

    if (this.searchTerm.length > 0) {
      this.searchFilms()
    }

  }

  searchFilms() {
    this.isLoading = true
    this.filmsService.searchPopularFilms(this.searchTerm).subscribe(
      (filmList: any) => {
        this.filmsData = filmList.results
        this.isLoading = false
      },
      err => {
        console.log("error");
      })
  }

  markFavouriteMovie(fav: any) {
    this.filmsService.markFavouriteMovie(this.accountId, this.sessionId, fav.filmId, fav.isFav)
      .subscribe(
      () => this.getFavourite()
    )

  }

  getFavourite() {
    this.filmsService.getFavoriteMovies(this.accountId, this.sessionId)
      .subscribe(
      (filmList: any) => {
        this.favFilms = filmList.results.map((film: { id: any }) => {
          return film.id
        })
        this.favoriteFilmsCount = this.favFilms.length
      })
  }

  addFilmToWatchList(watch: any) {
    this.filmsService.addToWatchlist(this.accountId, this.sessionId, watch.filmId, watch.isWatch)
      .subscribe(
        () => this.getWatchList()
      )

  }

  getWatchList() {
    this.filmsService.getMovieWatchlist(this.accountId, this.sessionId)
      .subscribe(
        (filmList: any) => {
          this.watchListFilms = filmList.results.map((film: { id: any }) => {
            return film.id
          })
        })
  }

}
