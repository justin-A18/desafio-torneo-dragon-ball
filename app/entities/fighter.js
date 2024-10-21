import {
  DEFAULT_ATTACK_DAMAGE_PERCENTAGE,
  DEFAULT_MAX_HEALTH,
  DEFAULT_PROBABILITIES_EVADING_ATTACK,
} from "../constants/defaults.js";
import { applyPercentageToDamage, testProbability } from "../utils/utils.js";

export function Fighter({
  name: _name,
  speed: _speed,
  attack: _attack,
  defense: _defense,
  icon: _icon,
}) {
  const name = _name;
  const icon = _icon;
  const speed = _speed;
  const attack = _attack;
  const defense = _defense;
  let health = DEFAULT_MAX_HEALTH;

  const getName = () => name;
  const getFullName = () => icon + name;

  const damage = (damage) => {
    const calculatedDamage =
      defense > damage
        ? applyPercentageToDamage(damage, DEFAULT_ATTACK_DAMAGE_PERCENTAGE)
        : Number(damage);
    // console.log(`La vida de ${getFullName()} es de ${health}`);
    if (calculatedDamage > health) health = 0;
    else health -= calculatedDamage;
    // console.log(`A ${getFullName()} le quedan ${health} puntos de vida`);

    return {
      damageDealt: calculatedDamage,
      healthLeft: health,
    };
  };

  const attackEnemy = (enemyFighter) => {
    if (tryToEvade()) {
      return {
        success: false,
        damageDealt: 0,
      };
    }
    const { damageDealt, healthLeft } = enemyFighter.damage(attack);
    // Returns true if attack was successful, otherwise false
    return {
      success: true,
      damageDealt,
      healthLeft,
    };
  };

  const isAlive = () => {
    return health > 0;
  };

  const isFaster = (otherFighter) => {
    return speed > otherFighter.speed;
  };

  const tryToEvade = () => {
    return testProbability(DEFAULT_PROBABILITIES_EVADING_ATTACK); // 20% chance to avoid attack
  };

  const restoreHealth = () => (health = DEFAULT_MAX_HEALTH);

  return {
    name,
    getName,
    getFullName,
    attackEnemy,
    damage,
    isFaster,
    isAlive,
    restoreHealth,
  };
}
