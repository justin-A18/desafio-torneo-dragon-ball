import { GetRandomCharactersUseCase } from "../domain/use-cases";
import { CharacterService } from "./character/character.service";
import { CalculatorADapter, ConsoleAdapter } from "../config/adapters";
import { FileService } from "./file/file.service";
import chalk from "chalk";
import { CharacterEntity } from "../domain/entities";

interface RunOptions {
  role: string;
  nroOfFighters: number;
}

export class ServerApp {
  private static actions: Record<string, Function> = {};

  private static fileService = new FileService();
  private static characterService = new CharacterService(this.fileService);

  static async run({ role, nroOfFighters }: RunOptions) {
    new ConsoleAdapter({ role });

    let option = "";

    this.actions["1"] = () => ServerApp.startTournament(nroOfFighters);

    do {
      option = await ConsoleAdapter.optionsMenu();

      if (this.actions[option]) await this.actions[option]();

      if (option !== "0") await ConsoleAdapter.pause();
    } while (option !== "0");
  }

  private static async startTournament(nroOfFighters: number) {
    const selectedCharacters = new GetRandomCharactersUseCase(
      this.characterService
    ).execute(nroOfFighters);

    const characterNames = selectedCharacters
      .map((c) => chalk.cyan.italic(c.name))
      .join(", ");

    console.log(
      chalk.yellowBright.bold("\nPersonajes seleccionados:"),
      "\n",
      characterNames
    );

    console.log(chalk.dim.whiteBright.bold("\n¡Que comience el torneo!"));

    let round = 1;

    while (selectedCharacters.length > 1) {
      console.log(
        chalk.hex("#f9ec42").bold.strikethrough("\n---"),
        chalk.redBright.bold.italic("Ronda"),
        chalk.blueBright.bold.italic(round),
        chalk.yellowBright.bold.strikethrough("---")
      );
      
      CalculatorADapter.shuffleArray(selectedCharacters);

      const nextRound: CharacterEntity[] = [];

      for (let i = 0; i < selectedCharacters.length; i += 2) {
        const fighter1 = selectedCharacters[i];
        const fighter2 = selectedCharacters[i + 1];

        // const winner = {};

        console.log(
          chalk.hex("#f9ec42").bold("🥊"),
          chalk.cyan.italic(fighter1.name),
          chalk.yellowBright.bold("vs"),
          chalk.cyan.italic(fighter2.name),
          chalk.greenBright.bold("=>"),
          chalk.blueBright.italic("Ganador:"),
          // chalk.yellowBright.bold.italic(winner.name)
        );

        // nextRound.push(winner);
      }

      selectedCharacters.splice(0, selectedCharacters.length, ...nextRound);
      
      round++;
    }
  }
}
