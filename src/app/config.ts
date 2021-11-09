import {InjectionToken} from "@angular/core";
import {FilmService} from "./film-catalog/film.service";

export const API_URL = new InjectionToken<FilmService>('https://api.themoviedb.org/3')
export const API_KEY = new InjectionToken<FilmService>('0994e7679a856150aadcecf7de489bce')
export const MOVIE_URL = new InjectionToken<FilmService>('https://api.themoviedb.org/3/movie')
export const SEARCH_URL = new InjectionToken<FilmService>('https://api.themoviedb.org/3/search')
export const PERSON_URL = new InjectionToken<FilmService>('https://api.themoviedb.org/3/person')
export const PARAMS = new InjectionToken<FilmService>('&api_key=0994e7679a856150aadcecf7de489bce&language=ru-RU')

export const IMG_PATH = new InjectionToken<FilmService>('https://image.tmdb.org/t/p')
export const MID_IMG_PATH = new InjectionToken<FilmService>('https://image.tmdb.org/t/p/w500')
export const SMALL_IMG_PATH = new InjectionToken<FilmService>('https://image.tmdb.org/t/p/w185')
export const BIG_BACK_PATH = new InjectionToken<FilmService>('https://image.tmdb.org/t/p/w1280')
export const MID_BACK_PATH = new InjectionToken<FilmService>('https://image.tmdb.org/t/p/w780')
export const SMALL_BACK_PATH = new InjectionToken<FilmService>('https://image.tmdb.org/t/p/w300')
