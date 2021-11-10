import { Component, OnInit } from '@angular/core';
import {FilmService} from "../film.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Film} from "../../film";

@Component({
  selector: 'app-actor-detail',
  templateUrl: './actor-detail.component.html',
  styleUrls: ['./actor-detail.component.scss']
})
export class ActorDetailComponent implements OnInit {

  actor: any

  actorData: any
  relatedFilms: any
  isLoading: boolean = false

  midImgURL = this.filmsService.midImgPath._desc

  constructor(
    public filmsService: FilmService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) =>{
      // Получаем биографию актера и некоторые данные
      this.filmsService.getActorById(+params.id).subscribe(actor => {
        this.actor = actor
        // Ищем актера по имени и получаем связанные фильмы
        this.searchActors()

      })
    })
  }

  searchActors() {
    this.isLoading = true
    this.filmsService.searchPopularActors(this.actor.name).subscribe(
      (actorList: any) => {
        this.actorData = actorList.results[0]
        this.relatedFilms = this.actorData.known_for

        console.log(this.relatedFilms)
        // this.actorData.known_for.map((film: { poster_path: any; }) => {
        //   console.log(film)
        //   return film.poster_path
        // })

        this.isLoading = false
      },
      err => {
        console.log("error");
      })
  }

  getRelatedFilms() {
    const keys = Object.keys(this.actorData)
    console.log(keys)
    console.log(this.actorData.known_for)
    this.actorData.map((film: { poster_path: any; }) => {
     // console.log(film)
      return film.poster_path
    })
  }

}
