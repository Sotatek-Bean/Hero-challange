import { Injectable, inject } from '@angular/core';
import { Entity, EntityType, Hero, Monster } from '../models/common-models';
import { EntityService } from './entity.service';
import {
  cloneDeep
} from 'lodash';
import { Subject, filter, firstValueFrom } from 'rxjs';
import { MessageService } from './message.service';
import { UserService } from './user.service';
import { AnimationType, CanvasService } from './canvas.service';
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
  // indicate game is playing or not, todo: feature remember last options with pause button
  paused = true;
  action$ = new Subject<Actions>();
  // group buttons for user actions (attack, heal, ...)
  actionGroup: Group | undefined;

  private entityService = inject(EntityService);
  private messageService = inject(MessageService);
  private userService = inject(UserService);
  private canvasService = inject(CanvasService);
  // set main fighting hero, todo: add list hero + button change the fighting hero
  setCurrentHero(hero: Hero) {
    this.fightHero = hero;
    this.hero = cloneDeep(this.fightHero);
    this.hero.maxHp = this.hero.health;
    this.canvasService.initHero(this.hero);
    this.canvasService.initStartBtn(this);
  }
  startBattle() {
    if (!this.fightHero) {
      return;
    }
    // prepare data hero & monster with canvas
    this.actionGroup = this.canvasService.initAction(this);

    this.hero = cloneDeep(this.fightHero);
    this.hero.maxHp = this.hero.health;
    this.canvasService.initHeroInfo(this.hero);

    this.monster = this.entityService.generateMonsterFight(this.hero);
    this.monster.maxHp = this.monster.health;
    this.canvasService.initMonster(this.monster);

    // set status
    this.paused = false;

    // create turn queue base on entitys speed (higher move first)
    this.turnQueue = [this.hero, this.monster].sort((a,b) => (b.speed || 0) - (a.speed || 0));

    // start the battle
    this.startTurnLoop(this.hero, this.monster, this.fightHero);
  }

  endBattle(playerWin: boolean, hero: Hero) {
    this.messageService.add(playerWin ? `Victory` : `Game Over`, this.canvasService);
    if (playerWin) {
      this.userService.addMoney(hero.level * 10);
      // 80% success
      if (Math.random() < 0.8) {
        //give drop item
        const drop = this.entityService.generateItem(hero);
        this.entityService.addItem(drop);
        this.messageService.add(`Drop new item: ${drop.name}`, this.canvasService);
      }
    }
    // set status
    this.paused = true;

    // re-init start btn to start a new round
    this.canvasService.initStartBtn(this, 'Start Again');

    // remove current fighting monster from canvas
    this.canvasService.monsterInfoGroup.destroy();
    this.canvasService.monsterGroup.destroy();
  }
  async startTurnLoop(hero: Hero, monster: Monster, heroBase: Hero) {
    if (this.turnQueue[0].type === EntityType.hero) {// this turn belong to user
      const action = await this.getUserAction();// wait for user choose action
      switch(action) {
        case Actions.attack:
          monster.health = monster.health - hero.atk;
          this.messageService.add(`Monster taked ${hero.atk} Damage`, this.canvasService);
          // update info HP for monster
          this.canvasService.initMonsterInfo(monster);
          break;
        case Actions.heal:
          // heal amount = 100 * (x / (10 + x)); with x = hero level
          const healPercent = Math.round((hero.level / (10 + hero.level)) * 100);
          const heal = Math.round(heroBase.health*healPercent/100);
          this.messageService.add(`Hero healed ${heal} HP`, this.canvasService);
          if (hero.health + heal > heroBase.health) { // heal must not pass maximun HP
            hero.health = heroBase.health;
            break;
          }
          hero.health = hero.health + heal;
          break;
      }
    } else {// this turn belong to monster
      const animation = this.canvasService.startAnimation(this.canvasService.monsterGroup, AnimationType.attack, 100, 200);
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          animation.stop();
          this.canvasService.monsterGroup.x(700);
          this.canvasService.monsterGroup.y(200);
          resolve();
        }, 1000);
      })
      hero.health = hero.health - monster.atk;
      this.messageService.add(`Hero taked ${monster.atk} Damage`, this.canvasService);
    }
    // update info HP for hero after: heal or attacked by monster
    this.canvasService.initHeroInfo(hero);

    // update info HP for hero after: heal or attacked by monster
    if (hero.health <=0 || monster.health <=0) {
      this.endBattle(hero.health > 0, hero);
      return;
    }
    // move this turn owner to last of turn queue
    this.turnQueue.push(this.turnQueue[0]);
    this.turnQueue.shift();
    // start next turn
    this.startTurnLoop(hero, monster, heroBase);
  }
  // user select option of actions
  doAction(action: Actions) {
    this.action$.next(action);
  }

  getUserAction(): Promise<Actions> {
    this.actionGroup?.show();
    return firstValueFrom(this.action$.pipe(filter(() => !this.paused)));
  }

}
