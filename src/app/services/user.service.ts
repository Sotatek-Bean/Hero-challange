import { Injectable, inject } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import { EntityService } from './entity.service';
import { DEFAULT_SAVE, SAVE_KEY } from '../constants/mock';
import { SaveData } from '../models/common-models';
import { cloneDeep } from 'lodash';

@Injectable({ providedIn: 'root' })
export class UserService {
  private credit$ = new BehaviorSubject(200);
  private entityService = inject(EntityService);

  setCredit(amount: number) {
    this.credit$.next(amount);
  }
  get money() {
    return this.credit$.value;
  }
  addMoney(amount: number) {
    this.credit$.next(this.credit$.value + amount);
  }

  //setup save data from localstorage
  setupSaveData() {
    let saveData: SaveData = DEFAULT_SAVE;
    const stringData = localStorage.getItem(SAVE_KEY);
    if (stringData && JSON.parse(stringData)) {
      saveData = JSON.parse(stringData);
      this.initSaveData(saveData);
    } else {
      this.saveUserData(saveData);
    }
  }

  // save current data to localstorage
  saveUserData(saveData?: SaveData) {
    if (!saveData) {
      saveData = {
        heroes: this.entityService.heroes$.value,
        items: this.entityService.items$.value,
        money: this.money,
      }
    }
    localStorage.setItem(SAVE_KEY, JSON.stringify(saveData))
  }
  initSaveData(saveData: SaveData) {
    this.entityService.setHeroInfo(saveData.heroes);
    this.entityService.setInventoryInfo(saveData.items);
    this.setCredit(saveData.money);
  }

  // reset save data to Default data (reset game)
  resetData() {
    this.initSaveData(cloneDeep(DEFAULT_SAVE));
  }
}
