import { Component, OnInit, inject } from '@angular/core';
import { Hero } from '../../models/common-models';
import { EntityService } from '../../services/entity.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ],
  standalone: true,
  imports: [CommonModule]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  private entityService = inject(EntityService);

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.entityService.getHeroes(true)
      .subscribe(heroes => this.heroes = heroes);
  }

  setHero(hero: Hero) {

  }
}
