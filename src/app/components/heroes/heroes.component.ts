import { Component, OnInit } from '@angular/core';

//Services
import { HeroesService } from './../../services/heroes.service';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: []
})
export class HeroesComponent implements OnInit {

  heroes:any[]=[];
  loading: boolean = true;

  constructor(private _heroesService: HeroesService) {
    this._heroesService.getHeroes().subscribe( response => {
      this.heroes = response;
      this.loading = false;
    })
  }

  ngOnInit() {
  }

  deleteHero(key$: string) {
    this._heroesService.deleteHero(key$).subscribe( response => {
      if (response) {
        console.error(response);
      } else {
        delete this.heroes[key$];
      }
    })
  }
}
