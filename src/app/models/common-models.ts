export interface Hero extends Entity {
  cost: number;
  unlocked: boolean;
  type: EntityType.hero;
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

export interface Item extends Entity {
  type: EntityType.weapon | EntityType.armor;
}

export interface Entity extends Stats {
  id: number;
  level: number;
  type: EntityType;
  name: string;
  avatar?: string;
}

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

export function DefaultItem(hero: Hero, id: number): Item {
  return {
    id,
    level: hero.level,
    name: 'randomname',
    type: Math.random() < 0.5 ? EntityType.armor : EntityType.weapon,
  }
}
