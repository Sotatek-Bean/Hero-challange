export interface Hero extends Entity {
  cost: number;
  unlocked: boolean;
  type: EntityType.hero;
}

export interface Item extends Entity {

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
  def?: number;
  speed?: number;
  health?: number;
}

export enum EntityType {
  hero = 'hero',
  weapon = 'weapon',
  armor = 'armor'
}
