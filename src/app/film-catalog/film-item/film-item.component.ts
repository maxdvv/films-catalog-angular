import {Component, EventEmitter, Input, OnInit, Output, ElementRef, ViewChild, SimpleChanges} from '@angular/core';
import {Film} from '../../film';
import { FilmService } from '../film.service';

@Component({
  selector: 'app-film-item',
  templateUrl: './film-item.component.html',
  styleUrls: ['./film-item.component.css']
})
export class FilmItemComponent implements OnInit {
  @Input() film: any;
  @Input() favFilms: any;
  @Input() watchListFilms: any;
  @Input() isMain: boolean | undefined;
  @Input() actor: any;
  @Input() counter: number | undefined;

  @Output('star') starEmitter = new EventEmitter<object>();
  @Output() watchListEmitter = new EventEmitter<object>();

  isFavClicked: boolean = false

  midImgURL = this.filmsService.midImgPath._desc
  constructor(private hostElement: ElementRef, public filmsService: FilmService) {
  }

  // получаем ссылку на конкретный DOM элемент компонента
  @ViewChild("name", { read: ElementRef }) nameDiv: ElementRef | undefined;

  ngOnInit() {
    //console.log("Hook Child, Инициализация дочернего компонента");
    // this.nameDiv.nativeElement.innerHTML = "Здесь могло быть название фильма";
    // console.log("Отображаем хост элемент");
    // console.log(this.hostElement.nativeElement.outerHTML);
  }

  ngOnChanges(changes: SimpleChanges) {
      // console.log("Hook Child, Проперти в дочернем компоненте поменялись");
      // console.dir(changes);
      // for (let key in changes) {
      //     console.log(`ключ = ${key}`)
      //     console.log(`            текущее значение = `);
      //     console.dir(changes[key].currentValue)
      //     console.log(`            предыдущее значение = `)
      //     console.dir(changes[key].previousValue)
      // }
  }

  ngAfterContentInit() {
    //console.log("Hook Child, Внешний контент установлен в дочерний компонент");
  }


  starFilm(filmId: string, isFav: boolean) {

    this.isFavClicked = isFav

    const fav = {
      filmId,
      isFav
    }

    this.starEmitter.emit(fav)
  }

  addToWatch(filmId: string, isWatch: boolean) {
    const watch = {
      filmId,
      isWatch
    }

    this.watchListEmitter.emit(watch);
  }

  showFilmInfo() {
    //console.log(this.film);
    return true;
  }

}
