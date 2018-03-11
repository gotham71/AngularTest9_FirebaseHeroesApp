import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Hero } from './../interfaces/hero.interface';
import 'rxjs/Rx';


@Injectable()
export class HeroesService {

  heroesUrl: string = "https://heroesapp-645c2.firebaseio.com/heroes.json";
  heroUrl: string = "https://heroesapp-645c2.firebaseio.com/heroes/";

  constructor( private http:Http) { }

  newHero( hero: Hero) {
    let body = JSON.stringify( hero );
    let headers = new Headers({
      'Content-type':'application/josn'
    });

    return this.http.post(this.heroesUrl, body, { headers: headers }).map( response => {
      console.log(response.json());
      return response.json();
    })
  }

  updateHero(hero: Hero, key$:string) {
    let body = JSON.stringify(hero);
    let headers = new Headers({
      'Content-type': 'application/josn'
    });

    let url = `${ this.heroUrl }/${ key$ }.json`;

    return this.http.put(url, body, { headers: headers }).map(response => {
      console.log(response.json());
      return response.json();
    })
  }

  getHero(key$:string) {
    let url = `${this.heroUrl}/${key$}.json`;
    return this.http.get(url).map(response => response.json());
  }

  deleteHero(key$:string) {
    let url = `${this.heroUrl}/${key$}.json`;
    return this.http.delete(url).map(response => response.json());
  }

  getHeroes() {
    return this.http.get(this.heroesUrl).map(res => res.json());
  }


}
