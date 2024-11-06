import { ConsoleAdapter } from "../config/adapters";

interface RunOptions {
  role: string;
  nroOfFighters: number;
}

export class ServerApp {
  private static actions: Record<string, Function> = {
    "1": () => ServerApp.startTournament(),
  };

  static async run({ role, nroOfFighters }: RunOptions) {
    let option = "";

    new ConsoleAdapter({ role });

    do {
      option = await ConsoleAdapter.optionsMenu();

      if (this.actions[option]) await this.actions[option]();

      if (option !== "0") await ConsoleAdapter.pause();
    } while (option !== "0");
  }

  private static async startTournament() {
    console.log("Torneo iniciado");
  }
}