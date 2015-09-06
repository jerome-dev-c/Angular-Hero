import {Component, NgFor, NgIf, View} from 'angular2/angular2';
import {HeroDetailComponent} from './hero-detail-component';
import {HeroService} from './hero-service';
import {Hero} from './hero';

@Component({
  selector: 'my-heroes',
  bindings: [HeroService]
})
@View({
  templateUrl: 'app/heroes-component.html',
  directives: [HeroDetailComponent, NgFor, NgIf],
  styleUrls: ['app/heroes-component.css']
})
export class HeroesComponent {
  private _heroes: Hero[];

  constructor(private _heroService: HeroService) { }

  currentHero: Hero;

  get heroes() {
    if (this._heroes) { return this._heroes; }

    this._heroService.getAllHeroes().then(heroes => {
      this._heroes = heroes;
    });
    return this._heroes;
  }

  onSelect(hero: Hero) {
    this.currentHero = hero;
  }

  selection(hero: Hero) {
    return hero === this.currentHero ? 'selected-item' : '';
  }
}
