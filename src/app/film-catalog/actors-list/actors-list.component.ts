import {Component, OnInit} from '@angular/core';
import {Film} from "../../film";
import {FilmService} from "../film.service";

@Component({
  selector: 'app-actors-list',
  templateUrl: './actors-list.component.html',
  styleUrls: ['./actors-list.component.scss']
})
export class ActorsListComponent implements OnInit {

  actorsData: Film[] = [];
  isLoading: boolean = false
  searchTerm: string = ''
  numLoadFilm: number = 3

  constructor(public filmsService: FilmService) {
  }

  ngOnInit() {
    this.fetchActors()
  }

  setNumLoadFilm() {
    if (this.numLoadFilm < 20) {
      if(this.actorsData.length !== 0) {
        this.numLoadFilm = this.numLoadFilm + 3
        this.fetchActors()
      }
    }
  }

  fetchActors() {
    this.isLoading = true
    this.filmsService.getPopularActors().subscribe(
      (filmList: any) => {
        this.actorsData = filmList.results.slice(0,this.numLoadFilm)
        this.isLoading = false
      },
      err => {
        console.log("error");
      })
  }

  setSearchTerm(searchTerm: string) {
    this.searchTerm = searchTerm

    if (this.searchTerm.length > 0) {
      this.searchActors()
    }

  }

  searchActors() {
    this.isLoading = true
    this.filmsService.searchPopularActors(this.searchTerm).subscribe(
      (actorList: any) => {
        this.actorsData = actorList.results
        this.isLoading = false
      },
      err => {
        console.log("error");
      })
  }

}
