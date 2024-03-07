import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Hero, Stats } from '../../../models/common-models';
import { EntityService } from '../../../services/entity.service';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class HeroDetailComponent {
  @Input({required:true}) hero?: Hero;
  entityService = inject(EntityService);
  userService = inject(UserService);
  unlockHero(hero: Hero) {
    if (this.userService.money > hero.cost) {
      this.userService.addMoney(-hero.cost);
      hero.unlocked = true;
    } else {
      alert('Not enough money');
    }
  }
  levelUp(hero: Hero) {
    if (this.userService.money > hero.cost * hero.level) {
      this.userService.addMoney(-(hero.cost * hero.level));
      hero.level++;
    } else {
      alert('Not enough money');
    }
  }
}
