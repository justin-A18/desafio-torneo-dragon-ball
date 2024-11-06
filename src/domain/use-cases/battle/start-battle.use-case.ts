import { CharacterEntity } from "../../entities";

import chalk from "chalk";

interface StartBattleUseCase {
  execute(
    fighter1: CharacterEntity,
    fighter2: CharacterEntity
  ): CharacterEntity;
}

export class StartBattle implements StartBattleUseCase {
  execute(
    fighter1: CharacterEntity,
    fighter2: CharacterEntity
  ): CharacterEntity {
    let fighterHealth1 = 100;
    let fighterHealth2 = 100;

    let [attacker, defender, attackerHealth, defenderHealth] =
      fighter1.speed >= fighter2.speed
        ? [fighter1, fighter2, fighterHealth1, fighterHealth2]
        : [fighter2, fighter1, fighterHealth2, fighterHealth1];

    while (attackerHealth > 0 && defenderHealth > 0) {
      const evade = Math.random() < 0.2;

      if (evade) {
        console.log(
          chalk.cyan.italic(defender.name),
          chalk.hex("#f9ec42")(" esquiva el ataque de "),
          chalk.cyan.italic(attacker.name),
          chalk.hex("#f9ec42")("👀\n")
        );
      } else {
        const damage =
          attacker.attack > defender.defense
            ? attacker.attack - defender.defense
            : attacker.attack * 0.1;

        defenderHealth = Math.max(0,defenderHealth - damage);

        console.log(
          chalk.cyan.italic(attacker.name),
          chalk.hex("#f9ec42")("ataca a"),
          chalk.cyan.italic(defender.name),
          chalk.hex("#f9ec42")("causando"),
          chalk.yellowBright.bold(damage.toFixed()),
          chalk.hex("#f9ec42")("de daño")
        );

        console.log(
          chalk.blueBright.italic(defender.name),
          " tiene ",
          chalk.red(defenderHealth.toFixed()),
          " de vida\n"
        );

        if (defenderHealth <= 0) {
          console.log(
            chalk.hex("#f9ec42").italic( "🏆",attacker.name),
            chalk.red("gana"),
            chalk.blue("la"),
            chalk.yellow("batalla 🏆\n")
          );

          return attacker;
        }
      }

      //* Intercambia los roles de atacante y defensor, y sus respectivas vidas
      [attacker, defender] = [defender, attacker];
      [attackerHealth, defenderHealth] = [defenderHealth, attackerHealth];
    }

    return attackerHealth > 0 ? attacker : defender;
  }
}
