import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, filter, map, of, switchMap} from 'rxjs';

import { EntityType, Hero, Item, Stats } from '../models/common-models';
import { BASE_ITEMS, HEROES } from '../constants/mock';

@Injectable({ providedIn: 'root' })
export class EntityService {
  heroes$ = new BehaviorSubject(HEROES);
  items$ = new BehaviorSubject(BASE_ITEMS);

  getHeroes(onlyUnlocked = false): Observable<Hero[]> {
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

  removeItem(item: Item) {
    this.items$.next(this.items$.value.filter(i => item.id != i.id));
  }

  getHero(id: number): Observable<Hero | undefined> {
    return this.heroes$.pipe(map(heroes => heroes.find(h => h.id === id)));
  }
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

  convertTrueStats(stats: Stats, level: number): Stats {
    return {
      atk: (stats.atk || 0) * level,
      health: (stats.health || 0) * level,
      speed: (stats.speed || 0) * level,
    }
  }
}
