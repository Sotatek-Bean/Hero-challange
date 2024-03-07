import { Injectable } from '@angular/core';
import Konva from 'konva';
import { Stage } from 'konva/lib/Stage';
import { Hero, Monster } from '../models/common-models';
import { Actions, PlayLoopService } from './play-loop.service';

@Injectable()
export class CanvasService {
  field: Stage | undefined;
  layer = new Konva.Layer();
  initAction(playLoopService: PlayLoopService) {
    const actionGroup = new Konva.Group({
      x: 0,
      y: 0,
    });
    actionGroup.hide();
    const attackGroup = new Konva.Group({
      x: 430,
      y: 500,
    });
    attackGroup.add(this.createButtonLayer(0, 0));
    attackGroup.add(this.createTextLayer(30,20, 'Attack'))

    const healGroup = new Konva.Group({
      x: 550,
      y: 500,
    });
    healGroup.add(this.createButtonLayer(0, 0));
    healGroup.add(this.createTextLayer(35,20, 'Heal'))
    healGroup.on('click', () => {
      playLoopService.doAction(Actions.heal);
      actionGroup.hide();
    });
    attackGroup.on('click', () => {
      playLoopService.doAction(Actions.attack);
      actionGroup.hide();
    });
    actionGroup.add(attackGroup);
    actionGroup.add(healGroup);
    this.layer.add(actionGroup);
    return actionGroup;
  }
  initHero(hero: Hero) {
    const heroGroup = new Konva.Group({
      x: 100,
      y: 350,
    });
    heroGroup.add(this.createImageLayer(0, 0, 250, 250, hero.avatar || hero.name));
    this.layer.add(heroGroup);
    return heroGroup;
  }
  initMonster(hero: Monster) {
    const monsterGroup = new Konva.Group({
      x: 700,
      y: 200,
    });
    monsterGroup.add(this.createImageLayer(0, 0, 250, 250, hero.avatar || hero.name));
    this.layer.add(monsterGroup);
    return monsterGroup;
  }
  initFieldCanvas(): void {
    const width = 1082;
    const height = 672;
    this.field = new Konva.Stage({
      container: 'playCanvas',
      width: width,
      height: height,
    });
    const backgroundLayer = this.createImageLayer(0, 0, 1082, 672, 'assets/field.png');
    this.layer.add(backgroundLayer);
    this.field.add(this.layer);
  }

  createImageLayer(x: number, y: number, width: number, height: number, src: string) {
    const image = new Image();
    image.src = src;
    return new Konva.Image({
      x,
      y,
      image: image,
      width,
      height,
    });
  }
  createButtonLayer(x: number, y: number) {
    return new Konva.Rect({
      x,
      y,
      width: 100,
      height: 50,
      fill: 'white',
      shadowBlur: 10,
      cornerRadius: 10,
    });
  }
  createTextLayer(x: number, y: number, text: string) {
    return new Konva.Text({
      x,
      y,
      text,
      fontSize: 15,
      fontFamily: 'Calibri',
      fill: 'green',
    });;
  }
}
