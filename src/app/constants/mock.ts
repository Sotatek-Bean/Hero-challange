import { Entity, EntityType, Hero, Item } from '../models/common-models';

export const HEROES: Hero[] = [
  { id: 1, name: 'Dr. Nice1', avatar: 'assets/sprite1.png', equip: {armor: undefined, weapon: undefined} ,cost: 100, level: 1, atk: 1, def: 1, health: 10, speed: 1, unlocked: false, type: EntityType.hero},
  { id: 2, name: 'Dr. Nice2', avatar: 'assets/sprite1.png', equip: {armor: undefined, weapon: undefined} ,cost: 100, level: 1, atk: 1, def: 1, health: 10, speed: 1, unlocked: true, type: EntityType.hero },
  { id: 3, name: 'Dr. Nice3', avatar: 'assets/sprite1.png', equip: {armor: undefined, weapon: undefined} ,cost: 100, level: 1, atk: 1, def: 1, health: 10, speed: 1, unlocked: false, type: EntityType.hero },
  { id: 4, name: 'Dr. Nice4', avatar: 'assets/sprite1.png', equip: {armor: undefined, weapon: undefined} ,cost: 100, level: 1, atk: 1, def: 1, health: 10, speed: 1, unlocked: false, type: EntityType.hero },
];

export const BASE_ITEMS: Item[] = [
  { id: 1, name: 'Base Armor', avatar: 'assets/sprite1.png', type: EntityType.armor, level: 2, def: 1, health: 10},
  { id: 2, name: 'Base Weapon', avatar: 'assets/sprite1.png', type: EntityType.weapon, level: 1, atk: 1, speed: 1},
];
