import { Component, DestroyRef, OnInit, inject } from '@angular/core';

import { Hero } from '../../models/common-models';
import { EntityService } from '../../services/entity.service';
import { CommonModule } from '@angular/common';
import { HeroDetailComponent } from '../components/hero-detail/hero-detail.component';
import { InventoryComponent } from "../components/inventory/inventory.component";
import { Subject, takeUntil } from 'rxjs';

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
  private unsub$ = new Subject<void>();

  private entityService = inject(EntityService);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.destroyRef.onDestroy(() => {
      this.unsub$.next();
      this.unsub$.complete();
    });
    this.getHeroes();
  }

  getHeroes(): void {
    this.entityService.getHeroes().pipe(takeUntil(this.unsub$))
    .subscribe(heroes => {
      this.heroes = heroes;
      if (heroes.length) {
        this.viewHero(heroes[0]);
      }});
  }

  viewHero(hero: Hero) {
    this.currentViewHero = hero;
  }
}
