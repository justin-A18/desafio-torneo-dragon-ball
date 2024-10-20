import { Fighter } from "./entities/fighter.js";
import { CHARACTERS, DEFAULT_FIGHTERS_NUMBER } from "./constants";
import { getRandomIntBetween } from "./utils";
import { log, logResults } from "./utils/logs.js";

function init() {
  const fighters = selectFighters();
  log.selectedFighters(fighters);

  startTournament(fighters);
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
  const fightersPairs = pairingFighters({ fighters });

  // TODO: Implement tournament logic
  // TODO: Implement win condition
  // TODO: Implement tie condition
  const tournamentResults = {
    rounds: [[]],
    winner: null,
  };

  // First deploy & first round battles

  // Deploy fighters pairs in results
  fightersPairs.map((pair) => {
    const fighter1 = pair[0];
    const fighter2 = pair[1];
    tournamentResults.rounds[0].push({
      fighter1,
      fighter2,
      battle: {
        turns: [],
      },
      results: {
        winner: null,
        loser: null,
      },
    });
  });

  // Make fight
  tournamentResults.rounds[0].forEach((data, index) => {
    const { fighter1, fighter2 } = data;
    const { turns, winner, loser } = startBattle(fighter1, fighter2);
    tournamentResults.rounds[0][index].battle.turns = [...turns];
    tournamentResults.rounds[0][index].results = { winner, loser };
  });
  tournamentResults.rounds[0].forEach((data) => {
    const { fighter1, fighter2 } = data;
    fighter1.restoreHealth();
    fighter2.restoreHealth();
  });

  // Nexts deploys & rounds battles

  while (
    tournamentResults.rounds[tournamentResults.rounds.length - 1].length > 1
  ) {
    // Deploy fighters pairs in results
    const newRound = tournamentResults.rounds[
      tournamentResults.rounds.length - 1
    ]
      .map((battle) => battle.results.winner)
      .reduce(
        (acc, winner) => {
          if (acc[acc.length - 1].length < 2) acc[acc.length - 1].push(winner);
          else acc.push([winner]);
          return acc;
        },
        [[]]
      )
      .map((pair) => ({
        fighter1: pair[0],
        fighter2: pair[1],
        battle: {
          turns: [],
        },
        results: {
          winner: null,
          loser: null,
        },
      }));
    tournamentResults.rounds.push(newRound);

    // Make fight
    tournamentResults.rounds[tournamentResults.rounds.length - 1].forEach(
      (data, index) => {
        const { fighter1, fighter2 } = data;
        const { turns, winner, loser } = startBattle(fighter1, fighter2);
        tournamentResults.rounds[tournamentResults.rounds.length - 1][
          index
        ].battle.turns = [...turns];
        tournamentResults.rounds[tournamentResults.rounds.length - 1][
          index
        ].results = {
          winner,
          loser,
        };
      }
    );
    tournamentResults.rounds[tournamentResults.rounds.length - 1].forEach(
      (data) => {
        const { fighter1, fighter2 } = data;
        fighter1.restoreHealth();
        fighter2.restoreHealth();
      }
    );
  }

  tournamentResults.winner =
    tournamentResults.rounds[
      tournamentResults.rounds.length - 1
    ][0].results.winner;
  logResults(tournamentResults);
  console.log("tournamentResults", tournamentResults);
}

function pairingFighters({ fighters: orignalFighters }) {
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
    const selectedIndex = getRandomIntBetween(0, fighters.length - 1);
    addFigherByIndex(selectedIndex);
  }

  log.fightersPairs(pairs);
  return pairs;
}

function startBattle(fighter1, fighter2) {
  const results = {
    winner: null,
    loser: null,
    turns: [],
  };
  let isFighter1Turn = fighter1.isFaster(fighter2) ? true : false;
  let turnsCounter = 0;

  while (fighter1.isAlive() && fighter2.isAlive()) {
    let attackResults;
    if (isFighter1Turn) {
      attackResults = fighter1.attackEnemy(fighter2);
    } else {
      attackResults = fighter2.attackEnemy(fighter1);
    }
    const { success, damageDealt } = attackResults;
    results.turns.push({
      attacker: isFighter1Turn ? fighter1 : fighter2,
      receiver: isFighter1Turn ? fighter2 : fighter1,
      damage: damageDealt,
      evaded: !success,
    });

    if (!(fighter1.isAlive() && fighter2.isAlive())) {
      results.winner = fighter1.isAlive() ? fighter1 : fighter2;
      results.loser = fighter1.isAlive() ? fighter2 : fighter1;
    }
    isFighter1Turn = !isFighter1Turn;
    turnsCounter++;
  }

  return results;
}
