import { CharacterEntity } from "../../entities";
import { CharacterService } from "../../../presentation";
import { CalculatorADapter } from "../../../config/adapters";

interface GetCharactersUseCase {
  execute(count: number): CharacterEntity[];
 }

export class GetRandomCharactersUseCase implements GetCharactersUseCase {
  constructor(
    private readonly characterService: CharacterService
  ) { }

  execute(count: number): CharacterEntity[] {
    const characters = this.characterService.getAll();
    
    const shuffledCharacters = CalculatorADapter.shuffleArray(characters);

    return shuffledCharacters.slice(0, count);
  }
}