import { Component, OnInit } from '@angular/core';
import {FilmService} from "../film.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.scss']
})
export class FilmDetailComponent implements OnInit {

  film: any
  video: any
  status: string | undefined

  midImgURL = this.filmsService.midImgPath._desc

  constructor(
    public filmsService: FilmService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) =>{
      this.filmsService.getFilmById(+params.id).subscribe(film => {
        this.film = film
        this.status = params.status
        console.log(this.film)
      })
      this.filmsService.getMovieVideo(+params.id).subscribe( video => {

        // @ts-ignore
        this.video = video.results.map(res => {
         return res.key
        })
        console.log(this.video)
        //this.video = video
        // @ts-ignore
        //console.log("video: ", video.results[0].key)
      })
    })
  }

  getVideo() {

  }

}
