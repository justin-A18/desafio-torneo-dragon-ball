import { Fighter } from "./entities/fighter.js";
import { CHARACTERS, DEFAULT_FIGHTERS_NUMBER } from "./constants";
import { getRandomIntBetween } from "./utils";

function init() {
  console.log("################################");

  const fighters = selectFighters();
  console.log(
    "los luchadores seleccionados son:",
    fighters.map((f) => f.getFullName())
  );

  startTournament(fighters);

  // const goku = Fighter(CHARACTERS.goku);
  // const freezer = Fighter(CHARACTERS.freezer);

  // startBattle(goku, freezer);
}
init();

function selectFighters() {
  const max = CHARACTERS.length;
  const selectedIndexes = [];

  while (selectedIndexes.length < DEFAULT_FIGHTERS_NUMBER) {
    const index = getRandomIntBetween(0, max - 1);
    if (!selectedIndexes.includes(index)) {
      selectedIndexes.push(index);
    }
  }

  return selectedIndexes.map((index) => Fighter(CHARACTERS[index]));
}

function startTournament(fighters) {
  matchFighters({ fighters });

  // TODO: Implement tournament logic
  // TODO: Implement win condition
  // TODO: Implement tie condition
  const tournamentResults = {
    rounds: [
      [
        {
          fighter1: null,
          fighter2: null,
          battle: {
            turns: [
              {
                attacker: null,
                receiver: null,
                damage: 0,
                evaded: false,
              },
            ],
          },
          results: {
            winner: null,
            loser: null,
          },
        },
        {
          fighter1: null,
          fighter2: null,
          battle: {
            turns: [
              {
                attacker: null,
                receiver: null,
                damage: 0,
                evaded: false,
              },
            ],
          },
          results: {
            winner: null,
            loser: null,
          },
        },
      ],
    ],
    winner: null,
  };
}

function matchFighters({ fighters: orignalFighters }) {
  // TODO: Implement match logic
  const fighters = [...orignalFighters];
  const pairs = [[]];

  const addFigherByIndex = (selectedIndex) => {
    if (pairs[pairs.length - 1].length < 2) {
      // Add the fighter in the last pair array
      pairs[pairs.length - 1].push(fighters[selectedIndex]);
    } else {
      // Adds a new partner array with the fighter
      pairs.push([fighters[selectedIndex]]);
    }
    fighters.splice(selectedIndex, 1); // Remove item of array
  };

  while (fighters.length > 0) {
    console.log("Emparejando...");
    const selectedIndex = getRandomIntBetween(0, fighters.length - 1);
    addFigherByIndex(selectedIndex);
  }
  console.log(
    "pairs:",
    pairs.map((pair) => pair.map((f) => f.getFullName()).join(" vs "))
  );
}

function startBattle(fighter1, fighter2) {
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
