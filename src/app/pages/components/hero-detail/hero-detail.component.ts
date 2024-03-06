import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Hero, Stats } from '../../../models/common-models';
import { EntityService } from '../../../services/entity.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class HeroDetailComponent {
  @Input({required:true}) hero?: Hero;
  entityService = inject(EntityService);

}
