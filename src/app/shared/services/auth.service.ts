import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable, Subject, throwError} from "rxjs";
import {catchError, retry, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public error$: Subject<string> = new Subject<string>()
  private loggedIn = false;

  apiUrl: string = "https://api.themoviedb.org/3"
  apiKey: string = 'bb52279222f912b6e0eb519e0a4926bb'
  apiTokenUrl: string = `${this.apiUrl}/authentication/token/new?api_key=${this.apiKey}`
  apiBindTokenToAccountUrl: string = `${this.apiUrl}/authentication/token/validate_with_login?api_key=${this.apiKey}`
  apiSessionUrl: string = `${this.apiUrl}/authentication/session/new?api_key=${this.apiKey}`
  apiUserUrl: string = `${this.apiUrl}/account?api_key=${this.apiKey}`


  constructor(private http: HttpClient) {
    // при обновлении страницы смотрим в localStorage чтоб проверить есть ли токен
    this.loggedIn = !!localStorage.getItem('movie-db-user-id');
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  get token() {
    return localStorage.getItem('movie-db-token')
  }

  get bindToken() {
    return localStorage.getItem('movie-db-bind-token')
  }

  get sessionId() {
    return localStorage.getItem('movie-db-session-id')
  }

  get userId() {
    return localStorage.getItem('movie-db-user-id')
  }

  isAuthenticated(): boolean {
    return !!this.userId
  }

  private setToken(response: any): void {
    localStorage.setItem('movie-db-token', response.request_token)
  }

  private setBindToken(response: any): void {
    localStorage.setItem('movie-db-bind-token', response.request_token)
  }

  private setSessionId(response: any): void {
    localStorage.setItem('movie-db-session-id', response.session_id)
  }

  private setUserId(response: any): void {
    localStorage.setItem('movie-db-user-id', response.id)
  }

  getToken() {
    return this.http.get(`${this.apiTokenUrl}`)
      .pipe(
        tap(res => {
          this.setToken(res)
        }),
        catchError(this.handleError.bind(this))
      );
  }

  bindTokenToAccount(username: string, password: string, token: string | null) {
    return this.http.post(`${this.apiBindTokenToAccountUrl}`,
    {
      "username": username,
      "password": password,
      "request_token": token
    })
      .pipe(
        tap(res => {
          this.setBindToken(res)
        }),
        catchError(this.handleError.bind(this))
      );
  }


  getSession(bindToken: string | null) {
    return this.http.post(`${this.apiSessionUrl}`,
      {
        "request_token": bindToken
      })
      .pipe(
        tap(res => {
          this.setSessionId(res)
        }),
        catchError(this.handleError.bind(this))
      );
  }

  getUser(sessionId: string | null) {
    return this.http.get(`${this.apiUserUrl}&session_id=${sessionId}`)
      .pipe(
        tap(res => {
          this.setUserId(res)
          // @ts-ignore
          if (res.id) {
            this.loggedIn = true;
          }
        }),
        catchError(this.handleError.bind(this))
      );
  }

  private handleError(error: HttpErrorResponse) {
    const message = error.error.status_message

    switch (message) {
      case 'Invalid username and/or password: You did not provide a valid login.':
        this.error$.next('Неверный логин или пароль')
        break
      case '':
        this.error$.next('Непонятная ошибка')
        break
    }

    return throwError(error)
  }

  logout() {
    localStorage.removeItem('movie-db-token');
    localStorage.removeItem('movie-db-bind-token');
    localStorage.removeItem('movie-db-session-id');
    localStorage.removeItem('movie-db-user-id');
    this.loggedIn = false;
  }

  deleteSession(sessionId: string | null) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        "session_id": sessionId
      }
    }

    return this.http.delete(`${this.apiUrl}/authentication/session?api_key=${this.apiKey}`, options)
      // .pipe(
      //   tap(res => {
      //     console.log("Delete result: ", res)
      //   }),
      //   catchError(this.handleError.bind(this))
      // );
  }
}
