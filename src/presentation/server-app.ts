import { ConsoleAdapter } from "../config/adapters/console.adapter";

interface RunOptions{
  role: string;
}

export class ServerApp {
  private static actions: Record<string, Function> = {
    "1": () => console.log("Comenzar torneo..."),
  }

  static async run({ role }: RunOptions) {
    console.log('Server running...');

    let option = "";

    do {
      option = await ConsoleAdapter.optionsMenu();

      if(this.actions[option]) await this.actions[option]();
      
      if(option !== "0") await ConsoleAdapter.pause();
    } while (option !== "0");
  }
}