import { Injectable, inject } from '@angular/core';
import { Entity, EntityType, Hero, Monster } from '../models/common-models';
import { EntityService } from './entity.service';
import {
  cloneDeep
} from 'lodash';
import { Subject, firstValueFrom } from 'rxjs';
import { MessageService } from './message.service';
import { UserService } from './user.service';
export enum Actions {
  attack = 'attack',
  heal = 'heal'
}
@Injectable()
export class PlayLoopService {
  turnQueue: Entity[] = [];
  fightHero: Hero | undefined;
  hero: Hero | undefined;
  monster: Monster | undefined;
  waitingAction = false;
  paused = true;
  action$ = new Subject<Actions>();
  private entityService = inject(EntityService);
  private messageService = inject(MessageService);
  private userService = inject(UserService);
  constructor() {}

  setCurrentHero(hero: Hero) {
    this.fightHero = hero;
    this.hero = cloneDeep(this.fightHero);
  }
  startBattle() {
    if (!this.fightHero) {
      return;
    }
    this.hero = cloneDeep(this.fightHero);
    this.paused = false;
    this.waitingAction = false;
    this.monster = this.entityService.generateMonsterFight(this.hero);
    this.turnQueue = [this.hero, this.monster].sort((a,b) => (b.speed || 0) - (a.speed || 0));
    this.messageService.add('Battle Started');
    this.startTurnLoop(this.hero, this.monster);
  }
  endBattle(playerWin: boolean, hero: Hero) {
    this.messageService.add('Battle Ended');
    if (playerWin) {
      this.userService.addMoney(hero.level * 10);
      // 50% success
      if (Math.random() < 0.5) {
        //give item
        const drop = this.entityService.generateItem(hero);
        this.entityService.addItem(drop);
        this.messageService.add(`Drop new item: ${drop.name}`);
      }
    }
    this.paused = true;
    this.waitingAction = false;
  }
  async startTurnLoop(hero: Hero, monster: Monster) {
    if (this.turnQueue[0].type === EntityType.hero) {
      const action = await this.getUserAction();
      switch(action) {
        case Actions.attack:
          this.messageService.add('Hero attack');
          monster.health = monster.health - hero.atk;
          this.messageService.add(`Monster HP: ${this.monster?.health}`);
          break;
        case Actions.heal:
          const healPercent = Math.round((hero.level / (10 + hero.level)) * 100);
          this.messageService.add(`Hero use heal ${healPercent} %`);
          const heal = Math.round(hero.health*healPercent/100);
          hero.health = hero.health + heal;
          this.messageService.add(`Hero healed ${heal} HP`);
          this.messageService.add(`Hero HP: ${this.hero?.health}`);
          break;
      }
    } else {
      this.messageService.add('Monster attack');
      hero.health = hero.health - monster.atk;
      this.messageService.add(`Hero HP: ${this.hero?.health}`);
    }

    if (hero.health <=0 || monster.health <=0) {
      this.endBattle(hero.health > 0, hero);
      return;
    }
    this.turnQueue.push(this.turnQueue[0]);
    this.turnQueue.shift();
    this.startTurnLoop(hero, monster);
  }

  doAction(action: Actions) {
    this.action$.next(action);
  }

  getUserAction(): Promise<Actions> {
    this.messageService.add('Wait User action');
    this.waitingAction = true;
    return firstValueFrom(this.action$);
  }

}
