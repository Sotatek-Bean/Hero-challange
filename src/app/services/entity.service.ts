import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, map} from 'rxjs';

import { Entity, EntityType, Hero } from '../models/common-models';
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

  getWeapons(): Observable<Entity[]> {
    return this.items$.pipe(map(items => items.filter(i => i.type === EntityType.weapon)));
  }

  getArmors(): Observable<Entity[]> {
    return this.items$.pipe(map(items => items.filter(i => i.type === EntityType.armor)));
  }

  getHero(id: number): Observable<Hero | undefined> {
    return this.heroes$.pipe(map(heroes => heroes.find(h => h.id === id)));
  }
}
