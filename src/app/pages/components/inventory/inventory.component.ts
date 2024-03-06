import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Hero, Item } from '../../../models/common-models';
import { EntityService } from '../../../services/entity.service';
import { FormsModule } from '@angular/forms';

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
  armors: Item[] = [];
  weapons: Item[] = [];

  ngOnInit(): void {
    this.setupInventory();
  }
  setupInventory() {
    this.entityService.getArmors()
    .subscribe(armors => this.armors = armors);
    this.entityService.getWeapons()
    .subscribe(weapons => this.weapons = weapons);
  }
}
