import { Injectable } from '@angular/core';
import Konva from 'konva';
import { Stage } from 'konva/lib/Stage';
import { Hero, Monster } from '../models/common-models';
import { Actions, PlayLoopService } from './play-loop.service';
import { Group } from 'konva/lib/Group';
export enum AnimationType {
  attack = 'attack',
  heal = 'heal',
}
@Injectable()
export class CanvasService {
  field: Stage | undefined;
  layer = new Konva.Layer();
  heroGroup = new Konva.Group({
    x: 100,
    y: 350,
  });
  monsterGroup = new Konva.Group({
    x: 700,
    y: 200,
  });

  startBtnGroup = new Konva.Group({
    x: 490,
    y: 300,
  });
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
      const animation = this.startAnimation(this.heroGroup, AnimationType.heal, 100, 300);
      setTimeout(() => {
        animation.stop();
        this.heroGroup.x(100);
        this.heroGroup.y(350);
        playLoopService.doAction(Actions.heal);
      }, 1000);
      actionGroup.hide();
    });
    attackGroup.on('click', () => {
      const animation = this.startAnimation(this.heroGroup, AnimationType.attack, 700, 50);
      setTimeout(() => {
        animation.stop();
        this.heroGroup.x(100);
        this.heroGroup.y(350);
        playLoopService.doAction(Actions.attack);
      }, 1000);
      actionGroup.hide();
    });
    actionGroup.add(attackGroup);
    actionGroup.add(healGroup);
    this.layer.add(actionGroup);
    return actionGroup;
  }
  startAnimation(target: Group, type: AnimationType, posX: number, possY: number) {
    const animation = new Konva.Animation((frame) => {
      if (frame) {
        let duration = 1000; //ms
        switch(type) {
          // attack animations
          case AnimationType.attack:
            target.x(
              100 * Math.sin((frame.time * 2 * Math.PI) / duration) + posX
            );
            target.y(
              100 * Math.cos((frame.time* 8 * Math.PI) / duration) + possY
            );
            break
          // healing animations
          case AnimationType.heal:
            duration = 1000;
            target.x(
              100 * Math.sin((frame.time * 2 * Math.PI) / duration) + posX
            );
            target.y(
              100 * Math.cos((frame.time* 2 * Math.PI) / duration) + possY
            );
            break
        }
      }
    }, this.layer);
    animation.start();
    return animation;
  }
  initStartBtn(playLoopService: PlayLoopService) {
    this.startBtnGroup.destroy();
    this.startBtnGroup = new Konva.Group({
      x: 490,
      y: 300,
    });
    this.startBtnGroup.add(this.createButtonLayer(0, 0));
    this.startBtnGroup.add(this.createTextLayer(35,20, 'Start'))
    this.startBtnGroup.on('click', () => {
      playLoopService.startBattle();
      this.startBtnGroup.destroy();
    });
    this.layer.add(this.startBtnGroup);
  }
  initHero(hero: Hero) {
    this.heroGroup.destroy();
    this.heroGroup = new Konva.Group({
      x: 100,
      y: 350,
    });
    this.heroGroup.add(this.createImageLayer(0, 0, 250, 250, hero.avatar || hero.name));
    this.layer.add(this.heroGroup);
  }
  initMonster(hero: Monster) {
    this.monsterGroup.destroy();
    this.monsterGroup.add(this.createImageLayer(0, 0, 250, 250, hero.avatar || hero.name));
    this.layer.add(this.monsterGroup);
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
      listening: false,
    });;
  }
}
