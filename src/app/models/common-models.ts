export interface Hero extends Entity {
  cost: number;
  unlocked: boolean;
  type: EntityType.hero;
  // equip Records for items (can equip unlimited of item type as please in future)
  equip: Record<EntityType.weapon | EntityType.armor, number | undefined>;
  atk: number;
  speed: number;
  health: number;
}

export interface Monster extends Entity {
  type: EntityType.monster;
  atk: number;
  speed: number;
  health: number;
}

// items/equiments affect stats
export interface Item extends Entity {
  type: EntityType.weapon | EntityType.armor;
}

// entity invole in fighting included items
export interface Entity extends Stats, Identity {
  maxHp?: number;
  id: number;
  level: number;
  type: EntityType;
}

// for showing visually
export interface Identity {
  name: string;
  avatar?: string;
}

// stats for fighting
export interface Stats {
  atk?: number;
  speed?: number;
  health?: number;
}

export enum EntityType {
  hero = 'hero',
  monster = 'monster',
  weapon = 'weapon',
  armor = 'armor'
}

export function DefaultItem(id: number): Item {
  return {
    id,
    level: 1,
    name: '',
    type: Math.random() < 0.5 ? EntityType.armor : EntityType.weapon,
  }
}

export interface SaveData {
  money: number,
  heroes: Hero[],
  items: Item[],
}
