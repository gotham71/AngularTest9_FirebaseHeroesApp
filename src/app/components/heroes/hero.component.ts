import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

//interface
import { Hero } from './../../interfaces/hero.interface';

//service
import { HeroesService } from './../../services/heroes.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styles: []
})
export class HeroComponent implements OnInit {

  private hero: Hero = {
    name: '',
    publisher: 'Marvel',
    bio: ''
  }

  new: boolean = false;
  id: string;

  constructor(private _heroesService: HeroesService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params
    .subscribe( parameters=> {

      this.id = parameters['id']
      if( this.id !== 'new' ){
        this._heroesService.getHero(this.id)
              .subscribe( hero => this.hero = hero) }
              })
  }





  ngOnInit() {
  }


  saveHero(){
    if (this.id == 'new') {
      this._heroesService.newHero(this.hero).subscribe( data=>{
      this.router.navigate(['/hero', data.name])
      },error=>console.log(error));
    } else {
      this._heroesService.updateHero(this.hero,this.id).subscribe(data => {
        console.log(data);
      }, error => console.log(error));
    }
  }

  addNew(form: NgForm){
    console.log(form.name);
    this.router.navigate(['/hero','new']);

    form.reset({
      publisher: "Marvel"
    });
  }

}
