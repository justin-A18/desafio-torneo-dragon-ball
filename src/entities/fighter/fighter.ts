import {
  DEFAULT_ATTACK_DAMAGE_PERCENTAGE,
  DEFAULT_MAX_HEALTH,
  DEFAULT_PROBABILITIES_EVADING_ATTACK,
} from "../../constants/defaults";
import { applyPercentageToDamage, testProbability } from "../../utils/utils";
import { IFighterProps, IFighterInstance } from "./fighter.types";

export function Fighter({
  name: _name,
  speed: _speed,
  attack: _attack,
  defense: _defense,
  icon: _icon,
}: IFighterProps): IFighterInstance {
  const name = _name;
  const icon = _icon;
  const speed = _speed;
  const attack = _attack;
  const defense = _defense;
  let health = DEFAULT_MAX_HEALTH;

  const getName = () => name;
  const getFullName = () => icon + name;
  const getSpeed = () => speed;

  const damage = (damage: number) => {
    const calculatedDamage =
      defense > damage
        ? applyPercentageToDamage(damage, DEFAULT_ATTACK_DAMAGE_PERCENTAGE)
        : Number(damage);
    if (calculatedDamage > health) health = 0;
    else health -= calculatedDamage;

    return {
      damageDealt: calculatedDamage,
      healthLeft: health,
    };
  };

  const attackEnemy = (enemyFighter: IFighterInstance) => {
    if (tryToEvade()) {
      return {
        success: false,
        damageDealt: 0,
      };
    }
    const { damageDealt, healthLeft } = enemyFighter.damage(attack);
    return {
      success: true,
      damageDealt,
      healthLeft,
    };
  };

  const isAlive = () => health > 0;

  const isFaster = (otherFighter: IFighterInstance) => {
    return speed > otherFighter.getSpeed();
  };

  const tryToEvade = () => {
    return testProbability(DEFAULT_PROBABILITIES_EVADING_ATTACK);
  };

  const restoreHealth = () => (health = DEFAULT_MAX_HEALTH);

  return {
    name,
    getName,
    getFullName,
    getSpeed,
    attackEnemy,
    damage,
    isFaster,
    isAlive,
    restoreHealth,
  };
}
