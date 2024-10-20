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
};

export const logResults = (results) => {
  results.rounds.forEach((round, index) => {
    console.log(`###########################################`);
    console.log(`################# Round ${index + 1} #################`);
    round.forEach((battleResults) => {
      const { fighter1, fighter2, battle, results } = battleResults;
      console.log(
        `🥊 Start battle between ${fighter1.getFullName()} and ${fighter2.getFullName()}`
      );
      battle.turns.forEach((turn, index) => {
        const { attacker, receiver, damage, evaded } = turn;
        console.log(
          `    ${attacker.getFullName()} attacks${
            index === 0 ? " first" : ""
          }!`,
          `${receiver.getFullName()} ${
            evaded
              ? "evaded the attack!"
              : `receives ${damage} points of damage.`
          }
          `
        );
      });
      console.log(`${results.winner.getFullName()} wins! 🏆`);
      console.log("=========================================");
    });
  });
  console.log(
    `🥇 The tournament champion is ${results.winner.getFullName()} 🎉`
  );
};
