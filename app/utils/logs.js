export const log = {
  selectedFighters: (fighters) =>
    console.log(
      "The selected fighters are:",
      fighters.map((f) => f.getFullName())
    ),
  fightersPairs: (pairs) =>
    console.log(
      "Fighters pairs are:",
      pairs.map((pair) => pair.map((f) => f.getFullName()).join(" vs "))
    ),
  round: (roundNumber) => {
    console.log(`###########################################`);
    console.log(`################# Round ${roundNumber} #################`);
  },
  startBattle: (name1, name2) =>
    console.log(`🥊 Start battle between ${name1} vs ${name2}`),
  turnAction: (
    attacker,
    receiver,
    damage,
    evaded,
    healthLeft,
    firstMovement
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
  roundWinner: (winner) => {
    console.log(`${winner} wins! 🏆`);
    console.log("=========================================");
  },
  championTournament: (champion) => {
    console.log(`🥇 The tournament champion is ${champion} 🎉`);
  },
};

export const logResults = (tournament) => {
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
      log.roundWinner(winner.getFullName());
    });
  });
  log.championTournament(tournament.champion.getFullName());
};
