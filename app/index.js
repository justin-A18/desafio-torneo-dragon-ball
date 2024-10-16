import { Fighter } from "./entities/fighter.js";
import { FIGHTERS } from "./constants/fighters.js";

function init() {
  console.log("################################");

  const goku = Fighter(FIGHTERS.goku);
  const freezer = Fighter(FIGHTERS.freezer);

  initBattle(goku, freezer);
}
init();

function initBattle(fighter1, fighter2) {
  console.log(
    `Init round between ${fighter1.getFullName()} and ${fighter2.getFullName()}`
  );
  let isFighter1Turn = fighter1.isFaster(fighter2) ? true : false;
  let turnsCounter = 0;

  while (fighter1.isAlive() && fighter2.isAlive()) {
    console.log(
      `${
        isFighter1Turn ? fighter1.getFullName() : fighter2.getFullName()
      } attacks${turnsCounter ? "" : " first"}!`
    );
    if (isFighter1Turn) {
      fighter1.attackEnemy(fighter2);
    } else {
      fighter2.attackEnemy(fighter1);
    }

    if (!(fighter1.isAlive() && fighter2.isAlive())) {
      console.log(
        `${
          fighter1.isAlive() ? fighter1.getName() : fighter2.getName()
        } wins! 🏆`
      );
    }
    isFighter1Turn = !isFighter1Turn;
    turnsCounter++;
  }
}
