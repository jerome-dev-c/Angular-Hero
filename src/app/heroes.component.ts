import {Component, View} from 'angular2/angular2';
import {Router} from 'angular2/router';
import {HeroService} from './hero.service';
import {Hero} from './hero';
import {Routes} from './route.config';
import {COMMON_DIRECTIVES} from './constants';

@Component({ selector: 'my-heroes' })
@View({
  templateUrl: 'app/heroes.component.html',
  directives: [COMMON_DIRECTIVES],
  styleUrls: ['app/heroes.component.css']
})
export class HeroesComponent {
  private _heroes: Hero[];
  public currentHero: Hero;

  constructor(private _heroService: HeroService, private _router: Router) { }

  get heroes() { return this._heroes || this.getHeroes(); }

  getHeroes() {
    this.currentHero = undefined;
    this._heroes = [];
    this._heroService.getHeroes()
      .then(heroes => this._heroes = heroes);

    return this._heroes;
  }

  getSelectedClass(hero: Hero) {
    return { 'selected': hero === this.currentHero };
  }

  goDetail() {
    this._router.navigate(`${Routes.detail.as}/${this.currentHero.id}`);
  }

  onSelect(hero: Hero) { this.currentHero = hero; }
}
