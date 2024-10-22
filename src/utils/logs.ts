import { IFighterInstance } from "../entities/fighter/fighter.types";
import { ITournament } from "../types/tournament";

export const log = {
  selectedFighters: (fighters: IFighterInstance[]) =>
    console.log(
      "The selected fighters are:",
      fighters.map((f) => f.getFullName())
    ),
  fightersPairs: (pairs: IFighterInstance[][]) =>
    console.log(
      "Fighters pairs are:",
      pairs.map((pair) => pair.map((f) => f.getFullName()).join(" vs "))
    ),
  round: (roundNumber: number) => {
    console.log(`###########################################`);
    console.log(`################# Round ${roundNumber} #################`);
  },
  startBattle: (name1: string, name2: string) =>
    console.log(`🥊 Start battle between ${name1} vs ${name2}`),
  turnAction: (
    attacker: string,
    receiver: string,
    damage: number,
    evaded: boolean,
    healthLeft: number = 0,
    firstMovement: boolean
  ) => {
    console.log(
      `    ${attacker} attacks ${receiver}${
        firstMovement ? " first" : ""
      }! ${receiver} ${
        evaded
          ? `evaded the attack!`
          : `receives ${damage} points of damage, has ${healthLeft} health points left.`
      }`
    );
  },
  roundWinner: (winnerName: string) => {
    console.log(`${winnerName} wins! 🏆`);
    console.log("=========================================");
  },
  championTournament: (championName: string) => {
    console.log(`🥇 The tournament champion is ${championName} 🎉`);
  },
};

export const logResults = (tournament: ITournament) => {
  log.selectedFighters(tournament.fighters);

  const pairs = tournament.rounds[0].map((battle) => [
    battle.fighter1,
    battle.fighter2,
  ]);
  log.fightersPairs(pairs);

  tournament.rounds.forEach((round, index) => {
    log.round(index + 1);
    round.forEach((battle) => {
      const { fighter1, fighter2, turns, winner } = battle;
      log.startBattle(fighter1.getFullName(), fighter2.getFullName());
      turns.forEach((turn, index) => {
        const { attacker, receiver, damage, evaded, healthLeft } = turn;
        log.turnAction(
          attacker.getFullName(),
          receiver.getFullName(),
          damage,
          evaded,
          healthLeft,
          index === 0
        );
      });
      if (winner) log.roundWinner(winner.getFullName());
    });
  });
  if (tournament.champion)
    log.championTournament(tournament.champion.getFullName());
};
