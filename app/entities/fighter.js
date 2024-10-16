import { testProbability } from "../utils/random.js";

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
  let health = 100;

  const getName = () => name;
  const getFullName = () => icon + name;

  const damage = (damage) => {
    const calculatedDamage = defense > damage ? damage * 0.1 : damage;
    if (calculatedDamage > health) health = 0;
    else health -= calculatedDamage;
    console.log(
      `${name} receives ${calculatedDamage} points of damage. Has ${health} points of life left`
    );
  };

  const attackEnemy = (enemyFighter) => {
    if (tryToAvoidDamage()) {
      console.log(`${enemyFighter.getName()} evaded the attack!`);
      return;
    }
    enemyFighter.damage(attack);
  };

  const isAlive = () => {
    return health > 0;
  };

  const isFaster = (otherFighter) => {
    return speed > otherFighter.speed;
  };

  const tryToAvoidDamage = () => {
    return testProbability(20); // 20% chance to avoid attack
  };

  return {
    getName,
    getFullName,
    attackEnemy,
    damage,
    isFaster,
    isAlive,
  };
}
