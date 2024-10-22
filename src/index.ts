import { Fighter } from "./entities/fighter/index";
import { CHARACTERS, DEFAULT_FIGHTERS_NUMBER } from "./constants/index";
import { getRandomIntBetween, logResults } from "./utils/index";
import { IFighterInstance } from "./entities/fighter/fighter.types";
import { ITournament, TRound, TTurn } from "./types/tournament";

(function init() {
  const fighters = selectFighters();
  const fightersPairs = pairingFighters({ fighters });
  startTournament(fightersPairs, fighters);
})();

function selectFighters() {
  const max = CHARACTERS.length;
  const selectedIndexes: number[] = [];

  while (selectedIndexes.length < DEFAULT_FIGHTERS_NUMBER) {
    const index = getRandomIntBetween(0, max - 1);
    if (!selectedIndexes.includes(index)) {
      selectedIndexes.push(index);
    }
  }
  return selectedIndexes.map((index) => Fighter(CHARACTERS[index]));
}

function startTournament(
  fightersPairs: IFighterInstance[][],
  fighters: IFighterInstance[]
) {
  const tournament: ITournament = {
    fighters,
    rounds: [],
    champion: null,
  };

  const restoreAllHealth = () => {
    tournament.rounds[tournament.rounds.length - 1].forEach((battle) => {
      battle.fighter1.restoreHealth();
      battle.fighter2.restoreHealth();
    });
  };

  const firstPairsDeployment = () => {
    const newRound: TRound = fightersPairs.map((pair) => ({
      fighter1: pair[0],
      fighter2: pair[1],
      turns: [],
      winner: null,
    }));
    tournament.rounds.push(newRound);
  };

  const nextsPairsDeployment = () => {
    const newRound = tournament.rounds[tournament.rounds.length - 1]
      .map((battle) => battle.winner)
      .filter((winner) => winner !== null)
      .reduce(
        (acc: IFighterInstance[][], winner) => {
          if (acc[acc.length - 1].length < 2) acc[acc.length - 1].push(winner);
          else acc.push([winner]);
          return acc;
        },
        [[]]
      )
      .map((pair) => ({
        fighter1: pair[0],
        fighter2: pair[1],
        turns: [],
        winner: null,
      }));
    tournament.rounds.push(newRound);
  };

  const makeFightLastRoundBattlers = () => {
    const lastRound = tournament.rounds[tournament.rounds.length - 1];
    lastRound.forEach((battle, index) => {
      const { turns, winner } = startBattle(battle.fighter1, battle.fighter2);
      lastRound[index].turns = [...turns];
      lastRound[index].winner = winner;
    });
    restoreAllHealth();
  };

  const validateWinner = () => {
    const lastRound = tournament.rounds[tournament.rounds.length - 1];
    if (lastRound.length <= 1) tournament.champion = lastRound[0].winner;
  };

  while (!tournament.champion) {
    if (!tournament.rounds.length) {
      // Is first deploy
      firstPairsDeployment();
    } else {
      // Others deployments
      nextsPairsDeployment();
    }

    makeFightLastRoundBattlers();

    validateWinner();
  }

  logResults(tournament);
  console.log("tournamentResults", tournament);
}

function pairingFighters({
  fighters: originalFighters,
}: {
  fighters: IFighterInstance[];
}) {
  const fighters = [...originalFighters];
  const pairs: IFighterInstance[][] = [[]];

  const addFigherByIndex = (selectedIndex: number) => {
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
  return pairs;
}

function startBattle(fighter1: IFighterInstance, fighter2: IFighterInstance) {
  const results: {
    winner: IFighterInstance | null;
    loser: IFighterInstance | null;
    turns: TTurn[];
  } = {
    winner: null,
    loser: null,
    turns: [],
  };
  let isFighter1Turn = fighter1.isFaster(fighter2) ? true : false;
  let turnsCounter = 0;

  while (fighter1.isAlive() && fighter2.isAlive()) {
    const { success, damageDealt, healthLeft } = isFighter1Turn
      ? fighter1.attackEnemy(fighter2)
      : fighter2.attackEnemy(fighter1);
    results.turns.push({
      attacker: isFighter1Turn ? fighter1 : fighter2,
      receiver: isFighter1Turn ? fighter2 : fighter1,
      damage: damageDealt,
      evaded: !success,
      healthLeft,
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
