import { EntityType, Hero, Identity, Item, Monster, SaveData } from '../models/common-models';
// first init data heroes
export const HEROES: Hero[] = [
  { id: 1, name: 'Elf Mage', avatar: 'assets/sprite1.png', equip: {armor: undefined, weapon: undefined} ,cost: 150, level: 1, atk: 5, health: 200, speed: 5, unlocked: false, type: EntityType.hero},
  { id: 2, name: 'Soldier 76', avatar: 'assets/sprite3.png', equip: {armor: undefined, weapon: undefined} ,cost: 100, level: 1, atk: 5, health: 150, speed: 5, unlocked: true, type: EntityType.hero },
  { id: 3, name: 'Dragon Trainer', avatar: 'assets/sprite2.png', equip: {armor: undefined, weapon: undefined} ,cost: 200, level: 1, atk: 10, health: 200, speed: 10, unlocked: false, type: EntityType.hero },
  { id: 4, name: 'Dragonite', avatar: 'assets/sprite4.png', equip: {armor: undefined, weapon: undefined} ,cost: 300, level: 1, atk: 15, health: 300, speed: 15, unlocked: false, type: EntityType.hero },
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
  { id: 1, name: 'Skeleton', avatar: 'assets/m2.png', type: EntityType.monster, level: 1, atk: 10, health: 50, speed: 20},
  { id: 2, name: 'Zombie MK.3', avatar: 'assets/m1.png', type: EntityType.monster, level: 1, atk: 15, health: 75, speed: 5},
  { id: 3, name: 'Berserker', avatar: 'assets/m3.png', type: EntityType.monster, level: 1, atk: 25, health: 125, speed: 0},
  { id: 4, name: 'The Demon', avatar: 'assets/boss.png', type: EntityType.monster, level: 1, atk: 25, health: 200, speed: 15},
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

export const DEFAULT_SAVE: SaveData = {
  heroes: HEROES,
  items: BASE_ITEMS,
  money: 200,
}

export const SAVE_KEY = 'bean-hero-challange';
// setting for battle field
export const BATTLE_FIELD = {
  background: 'assets/field.png',
  width: 1082,
  height: 672,
};
