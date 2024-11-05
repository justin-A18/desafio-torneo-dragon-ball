import { ConsoleAdapter } from "../config/adapters/console.adapter";

interface RunOptions{
  role: string;
}

export class ServerApp {
  private static actions: Record<string, Function> = {
    "1": () => ServerApp.startTournament(),
  }

  static async run({ role }: RunOptions) {

    let option = "";

    do {
      option = await ConsoleAdapter.optionsMenu();

      if(this.actions[option]) await this.actions[option]();
      
      if(option !== "0") await ConsoleAdapter.pause();
    } while (option !== "0");
  }

  private static async startTournament() { 
    console.log("Torneo iniciado");
  }
}