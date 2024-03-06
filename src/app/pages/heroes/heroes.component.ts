import { Component, OnInit, inject } from '@angular/core';

import { Hero } from '../../models/common-models';
import { EntityService } from '../../services/entity.service';
import { CommonModule } from '@angular/common';
import { HeroDetailComponent } from '../components/hero-detail/hero-detail.component';
import { InventoryComponent } from "../components/inventory/inventory.component";

@Component({
    selector: 'app-heroes',
    templateUrl: './heroes.component.html',
    styleUrls: ['./heroes.component.css'],
    standalone: true,
    imports: [CommonModule, HeroDetailComponent, InventoryComponent]
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  currentViewHero: Hero | undefined;
  private entityService = inject(EntityService);

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.entityService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }

  viewHero(hero: Hero) {
    this.currentViewHero = hero;
  }
}
