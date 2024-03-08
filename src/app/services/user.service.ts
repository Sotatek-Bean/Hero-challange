import { Injectable, inject } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import { EntityService } from './entity.service';
import { DEFAULT_SAVE } from '../constants/mock';
import { SaveData } from '../models/common-models';

@Injectable({ providedIn: 'root' })
export class UserService {
  private credit$ = new BehaviorSubject(200);
  entityService = inject(EntityService);
  setCredit(amount: number) {
    this.credit$.next(amount);
  }
  get money() {
    return this.credit$.value;
  }
  addMoney(amount: number) {
    this.credit$.next(this.credit$.value + amount);
  }
  setupSaveData() {
    let saveData: SaveData = DEFAULT_SAVE;
    const stringData = localStorage.getItem('bean-hero-challange');
    if (stringData && JSON.parse(stringData)) {
      saveData = JSON.parse(stringData);
      this.initSaveData(saveData);
    } else {
      this.saveUserData(saveData);
    }
  }
  saveUserData(saveData?: SaveData) {
    if (!saveData) {
      saveData = {
        heroes: this.entityService.heroes$.value,
        items: this.entityService.items$.value,
        money: this.money,
      }
    }
    localStorage.setItem('bean-hero-challange', JSON.stringify(saveData))
  }
  initSaveData(saveData: SaveData) {
    this.entityService.setHeroInfo(saveData.heroes);
    this.entityService.setInventoryInfo(saveData.items);
    this.setCredit(saveData.money);
  }
  resetData() {
    this.initSaveData(DEFAULT_SAVE);
  }
}
