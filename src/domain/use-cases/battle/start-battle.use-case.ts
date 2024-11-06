import { CharacterEntity } from "../../entities";

interface StartBattleUseCase {
  execute(fighter1: CharacterEntity,fighter2: CharacterEntity): CharacterEntity;
}

export class StartBattle implements StartBattleUseCase {

  execute(fighter1: CharacterEntity,fighter2: CharacterEntity): CharacterEntity {
    let fighterHealth1 = 100;
    let fighterHealth2 = 100;


    return {} as CharacterEntity;
  }
}
