import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, filter, map, of, switchMap} from 'rxjs';

import { DefaultItem, EntityType, Hero, Item, Monster, Stats } from '../models/common-models';
import { BASE_ITEMS, HEROES, MONSTER } from '../constants/mock';
import { now } from 'lodash';

@Injectable({ providedIn: 'root' })
export class EntityService {
  heroes$ = new BehaviorSubject(HEROES);
  items$ = new BehaviorSubject(BASE_ITEMS);
  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }
  generateMonsterFight(hero: Hero): Monster {
    const monster: Monster = {...MONSTER[this.getRandomInt(MONSTER.length)], level: hero.level};
    return {...monster, ...this.convertTrueStats(monster, monster.level)};
  }
  getHeroes(onlyUnlocked = false): Observable<Hero[]> {
    // filter unlocked hero and sort to top
    return this.heroes$.pipe(map(heroes => {
      return heroes.filter(h => !onlyUnlocked || h.unlocked).sort((a, b) => {
        return a.unlocked ? -1 : b.unlocked ? 1 : 0
      });
    }));
  }

  getWeapons(): Observable<Item[]> {
    return this.items$.pipe(map(items => items.filter(i => i.type === EntityType.weapon)));
  }

  getArmors(): Observable<Item[]> {
    return this.items$.pipe(map(items => items.filter(i => i.type === EntityType.armor)));
  }

  generateItem(hero: Hero) {
    const item = DefaultItem(hero, now());
    item.level = this.getRandomInt(hero.level + 1);
    if (item.type === EntityType.armor) {
      item.health = this.getRandomInt(50);
      item.speed = this.getRandomInt(5);
    } else {
      item.atk = this.getRandomInt(5);
      item.speed = this.getRandomInt(5);
    }
  }

  removeItem(item: Item) {
    this.items$.next(this.items$.value.filter(i => item.id != i.id));
  }

  getHero(id: number): Observable<Hero | undefined> {
    return this.heroes$.pipe(map(heroes => heroes.find(h => h.id === id)));
  }
  // calculate true stats of hero with items
  getHeroFightStats(heroId: number) {
    return this.heroes$.pipe(switchMap((heroes) => {
      const hero = heroes.find(h => h.id === heroId);
      if (hero) {
        const arrayStats = [this.convertTrueStats(hero, hero.level)];
        const weapon = this.items$.value.find(i => i.id === hero.equip[EntityType.weapon]);
        const armor = this.items$.value.find(i => i.id === hero.equip[EntityType.armor]);
        if (weapon) {
          arrayStats.push(this.convertTrueStats(weapon, weapon.level));
        }
        if (armor) {
          arrayStats.push(this.convertTrueStats(armor, armor.level));
        }
        const res: Stats = {
          atk: 0,
          health: 0,
          speed: 0,
        }
        arrayStats.forEach(s => {
          res.atk = (res.atk || 0) + (s.atk || 0);
          res.speed = (res.speed || 0) + (s.speed || 0);
          res.health = (res.health || 0) + (s.health || 0);
        })
        return of(res);
      }
      return of(undefined);
    }));
  }
  // calculate true stats combine with level (stats = base * level)
  convertTrueStats(stats: Stats, level: number): Stats {
    return {
      atk: (stats.atk || 0) * level,
      health: (stats.health || 0) * level,
      speed: (stats.speed || 0) * level,
    }
  }
}
