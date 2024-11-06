import { CharacterEntity } from "../../entities";

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
    
    while (attackerHealth > 0 && defenderHealth > 0) { }

    return {} as CharacterEntity;
  }
}
