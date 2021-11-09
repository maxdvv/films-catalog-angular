import { Component } from '@angular/core';
import {AuthService} from "./shared/services/auth.service";
import {Router} from "@angular/router";
import {FilmService} from "./film-catalog/film.service";

interface Link {
  path: string,
  label: string,
  active: string,
  icon: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  accountName: string | undefined

  constructor(
    public authService: AuthService,
    public filmService: FilmService,
    private router: Router,
  ) {
  }

  ngOnInit() {
  }

  getAccountDetail() {
    if(!this.accountName){
      const session = this.authService.sessionId
      this.filmService.getAccountDetail(session)
        .subscribe(
          (accountInfo: any) => {
            this.accountName = accountInfo.username
          }
        )
    }
  }

  logOut() {
    this.authService.deleteSession(this.authService.sessionId).subscribe(
      () => {
        this.authService.logout()
        this.router.navigate(['/login'])
      }
    )
  }

  links: Array<Link> = [
    { path: '/main', label: 'Главная', active: 'button-active', icon: 'home'},
    { path: '/films-list', label: 'Все фильмы', active: 'button-active', icon: 'movie'},
    { path: '/actors-list', label: 'Все актеры', active: 'button-active', icon: 'recent_actors'}
  ];

}
