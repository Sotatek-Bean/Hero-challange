import { Component, DestroyRef, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Hero, Item } from '../../../models/common-models';
import { EntityService } from '../../../services/entity.service';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: [ './inventory.component.scss' ],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class InventoryComponent implements OnInit {
  @Input({required:true}) hero?: Hero;
  private entityService = inject(EntityService);
  private userService = inject(UserService);
  private destroyRef = inject(DestroyRef);

  armors: Item[] = [];
  weapons: Item[] = [];
  private unsub$ = new Subject<void>();

  ngOnInit(): void {
    this.destroyRef.onDestroy(() => {
      this.unsub$.next();
      this.unsub$.complete();
    });
    this.setupInventory();
  }
  setupInventory() {
    this.entityService.getArmors().pipe(takeUntil(this.unsub$))
    .subscribe(armors => this.armors = armors);
    this.entityService.getWeapons().pipe(takeUntil(this.unsub$))
    .subscribe(weapons => this.weapons = weapons);
  }

  // equip item to hero
  equipItem(item: Item) {
    if (this.hero) {
      this.hero.equip[item.type] = this.hero.equip[item.type] === item.id ? undefined : item.id;
    }
  }

  sellItem(item: Item) {
    this.entityService.removeItem(item);
    this.userService.addMoney(item.level * 10)
  }
}
