import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchName'
})
export class SearchNamePipe implements PipeTransform {

  transform(films: any[], searchTerm: string, searchField: string) {
    //console.log(searchTerm);

    if (!films) {
      return [];
    }
    if (!searchTerm || !searchField) {
      return films;
    }

    return films.filter(film => film[searchField].toLowerCase().includes(searchTerm.toLowerCase()));
  }

}
