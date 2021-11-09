import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-search-film',
  templateUrl: './search-film.component.html',
  styleUrls: ['./search-film.component.scss']
})
export class SearchFilmComponent implements OnInit {
  searchTerm: string = ''

  @Output()
  searchTermOut: EventEmitter<string> = new EventEmitter<string>()

  constructor() { }

  ngOnInit(): void {
  }

  setSearchTerm() {
    this.searchTermOut.emit(this.searchTerm);
  }


}
