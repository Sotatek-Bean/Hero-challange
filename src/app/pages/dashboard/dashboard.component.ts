import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { Hero } from '../../models/common-models';
import { EntityService } from '../../services/entity.service';
import { CommonModule } from '@angular/common';
import { Actions, PlayService } from '../../services/play.service';
import { Subject, firstValueFrom, takeUntil } from 'rxjs';
import { CanvasService } from '../../services/canvas.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ],
  standalone: true,
  imports: [CommonModule],
  providers: [PlayService, CanvasService]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  readonly action = Actions;
  private unsub$ = new Subject<void>();

  private entityService = inject(EntityService);
  playService = inject(PlayService);
  private canvasService = inject(CanvasService);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.destroyRef.onDestroy(() => {
      this.unsub$.next();
      this.unsub$.complete();
    });
    this.getHeroes();
    this.canvasService.initFieldCanvas();
  }

  getHeroes(): void {
    this.entityService.getHeroes(true).pipe(takeUntil(this.unsub$))
      .subscribe(heroes => this.heroes = heroes);
  }

  async setHero(hero: Hero) {
    if (!this.playService.paused) {
      return;
    }
    const heroFightStats = {...hero, ...(await firstValueFrom(this.entityService.getHeroFightStats(hero.id)))};
    this.playService.setCurrentHero(heroFightStats);
  }
}
