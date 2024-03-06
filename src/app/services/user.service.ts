import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  credit$ = new BehaviorSubject(200);
  get money() {
    return this.credit$.value;
  }
  addMoney(amount: number) {
    this.credit$.next(this.credit$.value + amount);
  }
}
