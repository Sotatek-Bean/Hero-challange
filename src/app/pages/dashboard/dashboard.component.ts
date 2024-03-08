import { Component, OnInit, inject } from '@angular/core';
import { Hero } from '../../models/common-models';
import { EntityService } from '../../services/entity.service';
import { CommonModule } from '@angular/common';
import { Actions, PlayLoopService } from '../../services/play-loop.service';
import { firstValueFrom } from 'rxjs';
import { CanvasService } from '../../services/canvas.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ],
  standalone: true,
  imports: [CommonModule],
  providers: [PlayLoopService, CanvasService]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  readonly action = Actions;
  private entityService = inject(EntityService);
  playLoopService = inject(PlayLoopService);
  private canvasService = inject(CanvasService);

  ngOnInit(): void {
    this.getHeroes();
    this.canvasService.initFieldCanvas();
  }

  getHeroes(): void {
    this.entityService.getHeroes(true)
      .subscribe(heroes => this.heroes = heroes);
  }

  async setHero(hero: Hero) {
    if (!this.playLoopService.paused) {
      return;
    }
    const heroFightStats = {...hero, ...(await firstValueFrom(this.entityService.getHeroFightStats(hero.id)))};
    this.playLoopService.setCurrentHero(heroFightStats);
  }
}
