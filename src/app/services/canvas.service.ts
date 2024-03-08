import { Injectable } from '@angular/core';
import Konva from 'konva';
import { Stage } from 'konva/lib/Stage';
import { Hero, Monster } from '../models/common-models';
import { Actions, PlayLoopService } from './play-loop.service';
import { Group } from 'konva/lib/Group';
import { BATTLE_FIELD } from '../constants/mock';
export enum AnimationType {
  attack = 'attack',
  heal = 'heal',
}
@Injectable()
export class CanvasService {
  field: Stage | undefined;
  layer = new Konva.Layer();
  // contain hero backgound for animations
  heroGroup = new Konva.Group();
  // contain hero details with update HP
  heroInfoGroup = new Konva.Group();
  // contain monster backgound for animations
  monsterGroup = new Konva.Group();
  // contain monster backgound for animations
  monsterInfoGroup = new Konva.Group();
  // contain btn start battle
  startBtnGroup = new Konva.Group();
  // Message box to show messages
  messagesGroup = new Konva.Group();

  initMessage(message: string[]) {
    this.messagesGroup.destroy();
    this.messagesGroup = new Konva.Group({
      x: 400,
      y: 50,
    });
    this.messagesGroup.add(this.createRecLayer(0,0, {width: 300, height: 95, fill: 'white', opacity: 0.4, shadowBlur: 1}));
    // show top 5 latest messages with first one highlighted
    for(let i = 0; i < message.length && i < 5; i++) {
      this.messagesGroup.add(this.createTextLayer(30,10+i*15, message[i], {
        fill: i === 0 ? 'blue' :'white',
        fontSize: i === 0 ? 18 : 15,
      }))
    }
    this.layer.add(this.messagesGroup);
  }

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
    attackGroup.add(this.createRecLayer(0, 0));
    attackGroup.add(this.createTextLayer(30,20, 'Attack'))

    const healGroup = new Konva.Group({
      x: 550,
      y: 500,
    });
    healGroup.add(this.createRecLayer(0, 0));
    healGroup.add(this.createTextLayer(35,20, 'Heal'))

    // onclick start animation then do action healing
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

  /**
  * @param target: group will do animation
  * @param type: type of Animation will do (healing animation/attack animation/...)
  * @param posX and @param possY: coordinates will run animation at center
  * @param duration: duration of 1 loop of animation
  * todo: add more animations
  */
  startAnimation(target: Group, type: AnimationType, posX: number, possY: number, duration = 1000) {
    target.moveToTop();
    const animation = new Konva.Animation((frame) => {
      if (frame) {
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

  initStartBtn(playLoopService: PlayLoopService, startText?: string) {
    this.startBtnGroup.destroy();
    this.startBtnGroup = new Konva.Group({
      x: 490,
      y: 300,
    });
    this.startBtnGroup.add(this.createRecLayer(0, 0));
    this.startBtnGroup.add(this.createTextLayer(startText ? 16 : 35,20, startText || 'Start'));

    this.startBtnGroup.on('click', () => {
      playLoopService.startBattle();
      this.startBtnGroup.destroy();
    });
    this.layer.add(this.startBtnGroup);
  }

  initHero(hero: Hero, playLoopService: PlayLoopService) {
    this.heroGroup.destroy();
    this.heroGroup = new Konva.Group({
      x: 100,
      y: 350,
    });
    this.heroGroup.add(this.createImageLayer(0, 0, 250, 250, hero.avatar || hero.name));
    this.heroGroup.on('click', () => {
      if (playLoopService.paused) {
        playLoopService.clearHero();
        this.heroGroup.destroy();
        this.heroInfoGroup.destroy();
      }
    });
    this.initHeroInfo(hero);
    this.layer.add(this.heroGroup);
  }
  // init HP, name
  initHeroInfo(hero: Hero) {
    this.heroInfoGroup.destroy();
    this.heroInfoGroup = new Konva.Group({
      x: 100,
      y: 350,
    });
    let hpWidth = 160;
    let hpColor = 'lightGreen';
    if (hero.maxHp && hero.health > 0) {
      const ratio = hero.health/hero.maxHp;
      hpWidth = 160 * ratio;
      if (ratio < 0.5) { //show red when <50%
        hpColor = 'red';
      }
    }
    this.heroInfoGroup.add(this.createRecLayer(30,250, {width: 200, height: 70, fill: '#F6F5F5', opacity: 0.2}));
    this.heroInfoGroup.add(this.createTextLayer(80,260, `${hero.name} - Lv.${hero.level}`, {fill: '#0C359E'}));
    this.heroInfoGroup.add(this.createTextLayer(90,280, `Hp: ${hero.health}/${hero.maxHp}`, {fill: '#0C359E'}));
    this.heroInfoGroup.add(this.createRecLayer(50,300, {width: hpWidth, height: 10, fill: hpColor}));
    this.layer.add(this.heroInfoGroup);
  }

  initMonster(monster: Monster) {
    this.monsterGroup.destroy();
    this.monsterGroup = new Konva.Group({
      x: 700,
      y: 200,
    });
    this.monsterGroup.add(this.createImageLayer(0, 0, 250, 250, monster.avatar || monster.name));
    this.initMonsterInfo(monster);
    this.layer.add(this.monsterGroup);
  }
  // init HP, name
  initMonsterInfo(monster: Monster) {
    this.monsterInfoGroup.destroy();
    this.monsterInfoGroup = new Konva.Group({
      x: 700,
      y: 200,
    });
    let hpWidth = 160;
    let hpColor = 'lightGreen';
    if (monster.maxHp && monster.health > 0) {
      const ratio = monster.health/monster.maxHp;
      hpWidth = 160 * ratio;
      if (ratio < 0.5) { //show red when <50%
        hpColor = 'red';
      }
    }
    this.monsterInfoGroup.add(this.createRecLayer(30,250, {width: 200, height: 70, fill: '#BED1CF', opacity: 0.3, shadowBlur: 3}));
    this.monsterInfoGroup.add(this.createTextLayer(80,260, `${monster.name} - Lv.${monster.level}`, {fill: 'red'}));
    this.monsterInfoGroup.add(this.createTextLayer(90,280, `Hp: ${monster.health}/${monster.maxHp}`, {fill: '#FFF7F1'}));
    this.monsterInfoGroup.add(this.createRecLayer(50,300, {width: hpWidth, height: 10, fill: hpColor}));
    this.layer.add(this.monsterInfoGroup);
  }

  // stage canvas
  initFieldCanvas(): void {
    this.field = new Konva.Stage({
      container: 'playCanvas',
      width: BATTLE_FIELD.width,
      height: BATTLE_FIELD.height,
    });
    this.layer.add(this.createImageLayer(0, 0, 1082, 672, BATTLE_FIELD.background));
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
  createRecLayer(x: number, y: number, otp?: any) {
    return new Konva.Rect({
      x,
      y,
      width: 100,
      height: 50,
      fill: 'white',
      shadowBlur: 10,
      cornerRadius: 10,
      ...otp
    });
  }
  createTextLayer(x: number, y: number, text: string, otp?: any) {
    return new Konva.Text({
      x,
      y,
      text,
      fontSize: 15,
      fontFamily: 'Calibri',
      fill: 'green',
      listening: false,
      ...otp,
    });
  }
}
