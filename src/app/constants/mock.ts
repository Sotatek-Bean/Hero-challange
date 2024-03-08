import { Entity, EntityType, Hero, Identity, Item, Monster } from '../models/common-models';
// first init data heroes
export const HEROES: Hero[] = [
  { id: 1, name: 'Dr. Nice1', avatar: 'assets/sprite1.png', equip: {armor: undefined, weapon: undefined} ,cost: 150, level: 1, atk: 5, health: 200, speed: 5, unlocked: false, type: EntityType.hero},
  { id: 2, name: 'Dr. Nice2', avatar: 'assets/sprite1.png', equip: {armor: undefined, weapon: undefined} ,cost: 100, level: 1, atk: 5, health: 150, speed: 5, unlocked: true, type: EntityType.hero },
  { id: 3, name: 'Dr. Nice3', avatar: 'assets/sprite1.png', equip: {armor: undefined, weapon: undefined} ,cost: 200, level: 1, atk: 10, health: 200, speed: 10, unlocked: false, type: EntityType.hero },
  { id: 4, name: 'Dr. Nice4', avatar: 'assets/sprite1.png', equip: {armor: undefined, weapon: undefined} ,cost: 300, level: 1, atk: 15, health: 300, speed: 15, unlocked: false, type: EntityType.hero },
];
// first init data inventory's items
export const BASE_ITEMS: Item[] = [
  { id: 1, name: 'Base Armor', avatar: 'assets/sprite1.png', type: EntityType.armor, level: 1, health: 10},
  { id: 2, name: 'Hand Gun', avatar: 'assets/sprite1.png', type: EntityType.weapon, level: 1, atk: 2, speed: 1},
  { id: 3, name: 'Weapon', avatar: 'assets/sprite1.png', type: EntityType.weapon, level: 1, atk: 4, speed: 0},
  { id: 4, name: 'Gun', avatar: 'assets/sprite1.png', type: EntityType.weapon, level: 1, atk: 1, speed: 2},
];

// Monster Types to random from
export const MONSTER: Monster[] = [
  { id: 1, name: 'Normal', avatar: 'assets/sprite1.png', type: EntityType.monster, level: 1, atk: 10, health: 50, speed: 2},
  { id: 2, name: 'Super', avatar: 'assets/sprite1.png', type: EntityType.monster, level: 1, atk: 15, health: 100, speed: 3},
  { id: 3, name: 'Boss', avatar: 'assets/sprite1.png', type: EntityType.monster, level: 1, atk: 20, health: 150, speed: 4},
];

export const WEAPON_TYPES: Identity[] = [
  { name: 'Iron Sword', avatar: '', },
  { name: 'Iron Axe', avatar: '', },
  { name: 'Bow', avatar: '', },
  { name: 'Hand Gun', avatar: '', },
  { name: 'Rifle', avatar: '', },
];

export const ARMOR_TYPES: Identity[] = [
  { name: 'Iron Shield', avatar: '', },
  { name: 'Iron Armor', avatar: '', },
  { name: 'Magic Orb', avatar: '', },
];
