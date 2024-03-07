import { Injectable, inject } from '@angular/core';
import { Entity, EntityType, Hero, Monster } from '../models/common-models';
import { EntityService } from './entity.service';
import {
  cloneDeep
} from 'lodash';
import { Subject, firstValueFrom } from 'rxjs';
import { MessageService } from './message.service';
import { UserService } from './user.service';
import { AnimationType, CanvasService } from './canvas.serivce';
import { Group } from 'konva/lib/Group';
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
  paused = true;
  action$ = new Subject<Actions>();
  actionGroup: Group | undefined;
  private entityService = inject(EntityService);
  private messageService = inject(MessageService);
  private userService = inject(UserService);
  private canvasService = inject(CanvasService);
  constructor() {}

  setCurrentHero(hero: Hero) {
    this.fightHero = hero;
    this.hero = cloneDeep(this.fightHero);
    this.canvasService.initHero(this.hero);
    this.canvasService.initStartBtn(this);
  }
  startBattle() {
    if (!this.fightHero) {
      return;
    }
    this.actionGroup = this.canvasService.initAction(this);
    this.hero = cloneDeep(this.fightHero);
    this.paused = false;
    this.monster = this.entityService.generateMonsterFight(this.hero);
    this.monster.maxHp = this.monster.health;
    this.canvasService.initMonster(this.monster);
    this.turnQueue = [this.hero, this.monster].sort((a,b) => (b.speed || 0) - (a.speed || 0));
    this.startTurnLoop(this.hero, this.monster, this.fightHero);
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
    this.canvasService.initStartBtn(this);
  }
  async startTurnLoop(hero: Hero, monster: Monster, heroBase: Hero) {
    if (this.turnQueue[0].type === EntityType.hero) {
      const action = await this.getUserAction();
      switch(action) {
        case Actions.attack:
          this.messageService.add('Hero attack');
          monster.health = monster.health - hero.atk;
          break;
        case Actions.heal:
          const healPercent = Math.round((hero.level / (10 + hero.level)) * 100);
          const heal = Math.round(heroBase.health*healPercent/100);
          this.messageService.add(`Hero healed ${heal} HP`);
          if (hero.health + heal > heroBase.health) {
            hero.health = heroBase.health;
            break;
          }
          hero.health = hero.health + heal;
          break;
      }
    } else {
      const animation = this.canvasService.startAnimation(this.canvasService.monsterGroup, AnimationType.attack, 100, 300);
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          animation.stop();
          this.canvasService.monsterGroup.x(700);
          this.canvasService.monsterGroup.y(200);
          resolve();
        }, 1000);
      })
      hero.health = hero.health - monster.atk;
    }

    if (hero.health <=0 || monster.health <=0) {
      this.endBattle(hero.health > 0, hero);
      return;
    }
    this.turnQueue.push(this.turnQueue[0]);
    this.turnQueue.shift();
    this.startTurnLoop(hero, monster, heroBase);
  }

  doAction(action: Actions) {
    this.action$.next(action);
  }

  getUserAction(): Promise<Actions> {
    this.messageService.add('Wait User action');
    this.actionGroup?.show();
    return firstValueFrom(this.action$);
  }

}
