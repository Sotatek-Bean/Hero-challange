import { Entity, EntityType, Hero, Item, Monster } from '../models/common-models';
// first init data heroes
export const HEROES: Hero[] = [
  { id: 1, name: 'Dr. Nice1', avatar: 'assets/sprite1.png', equip: {armor: undefined, weapon: undefined} ,cost: 100, level: 1, atk: 1, health: 100, speed: 1, unlocked: false, type: EntityType.hero},
  { id: 2, name: 'Dr. Nice2', avatar: 'assets/sprite1.png', equip: {armor: undefined, weapon: undefined} ,cost: 100, level: 1, atk: 1, health: 100, speed: 1, unlocked: true, type: EntityType.hero },
  { id: 3, name: 'Dr. Nice3', avatar: 'assets/sprite1.png', equip: {armor: undefined, weapon: undefined} ,cost: 100, level: 1, atk: 1, health: 100, speed: 1, unlocked: false, type: EntityType.hero },
  { id: 4, name: 'Dr. Nice4', avatar: 'assets/sprite1.png', equip: {armor: undefined, weapon: undefined} ,cost: 100, level: 1, atk: 1, health: 100, speed: 1, unlocked: false, type: EntityType.hero },
];
// first init data inventory's items
export const BASE_ITEMS: Item[] = [
  { id: 1, name: 'Base Armor', avatar: 'assets/sprite1.png', type: EntityType.armor, level: 1, health: 10},
  { id: 2, name: 'Base Weapon', avatar: 'assets/sprite1.png', type: EntityType.weapon, level: 1, atk: 2, speed: 1},
  { id: 3, name: 'Weapon', avatar: 'assets/sprite1.png', type: EntityType.weapon, level: 1, atk: 3, speed: 0},
  { id: 4, name: 'Gun', avatar: 'assets/sprite1.png', type: EntityType.weapon, level: 1, atk: 1, speed: 2},
];

// Monster Types to random from
export const MONSTER: Monster[] = [
  { id: 1, name: 'Normal', avatar: 'assets/sprite1.png', type: EntityType.monster, level: 1, atk: 10, health: 100, speed: 2},
  { id: 2, name: 'Super', avatar: 'assets/sprite1.png', type: EntityType.monster, level: 1, atk: 15, health: 300, speed: 3},
  { id: 3, name: 'Boss', avatar: 'assets/sprite1.png', type: EntityType.monster, level: 1, atk: 20, health: 600, speed: 4},
];
