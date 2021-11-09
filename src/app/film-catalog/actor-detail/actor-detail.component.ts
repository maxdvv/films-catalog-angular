import { Component, OnInit } from '@angular/core';
import {FilmService} from "../film.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-actor-detail',
  templateUrl: './actor-detail.component.html',
  styleUrls: ['./actor-detail.component.scss']
})
export class ActorDetailComponent implements OnInit {

  actor: any

  midImgURL = this.filmsService.midImgPath._desc

  constructor(
    public filmsService: FilmService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) =>{
      this.filmsService.getActorById(+params.id).subscribe(actor => {
        this.actor = actor
      })
    })
  }


}
