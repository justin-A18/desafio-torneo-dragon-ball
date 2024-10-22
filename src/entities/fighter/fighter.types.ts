export interface IFighterProps {
  name: string;
  speed: number;
  attack: number;
  defense: number;
  icon: string;
}

export interface IFighterInstance {
  name: string;
  getName: () => string;
  getFullName: () => string;
  getSpeed: () => number;
  damage: (damage: number) => TDamageResponse;
  attackEnemy: (enemyFighter: IFighterInstance) => TAttackResponse;
  isFaster: (otherFighter: IFighterInstance) => boolean;
  isAlive: () => boolean;
  restoreHealth: () => void;
}

type TDamageResponse = {
  damageDealt: number;
  healthLeft: number;
};

type TAttackResponse = {
  success: boolean;
  damageDealt: number;
  healthLeft?: number;
};
