import inquirer from "inquirer";
import { UnnamedDistinctQuestion } from "inquirer/dist/commonjs/types";

import chalk from "chalk";

type Questions = UnnamedDistinctQuestion<{ [x: string]: any }> & {
  name: string;
};

type OptionsMenu = {
  id: string;
  desc: string;
  checked?: boolean;
};

export class ConsoleAdapter {
  private static questions: Questions[] = [
    {
      type: "list",
      name: "option",
      message: `${chalk.hex("#f9ec42")("Seleccione")} ${chalk.red("una")} ${chalk.blueBright("opción")}`,
      choices: [
        {
          value: "1",
          name: `${chalk.yellowBright("1.")} Comenzar torneo`,
        },
        {
          value: "0",
          name: `${chalk.yellowBright("0.")} Salir`,
        },
      ],
    },
  ];

  static async checkMenu(options: OptionsMenu[], message: string): Promise<string[]> {
    const choices = options.map((option, index) => {
      const i = chalk.blueBright(`${index + 1}.`);

      return {
        value: option.id,
        name: `${i} ${option.desc}`,
        checked: option.checked,
      };
    });

    const questions: Questions[] = [
      {
        type: "checkbox",
        name: "ids",
        message,
        choices,
      },
    ];

    const { ids } = await inquirer.prompt(questions);

    return ids;
  }

  static async confirm(message: string): Promise<boolean> {
    const question: Questions[] = [
      {
        type: "confirm",
        name: "ok",
        message,
      },
    ];

    const { ok } = await inquirer.prompt(question);

    return ok;
  }

  static async listMenu(options: OptionsMenu[], message: string): Promise<string> {
    const choices = options.map((option, index) => {
      const i = chalk.blueBright(`${index + 1}.`);

      return {
        value: option.id,
        name: `${i} ${option.desc}`,
      };
    });

    choices.unshift({
      value: "0",
      name: `${chalk.blueBright("0.")} Cancelar`,
    });

    const questions: Questions[] = [
      {
        type: "list",
        name: "id",
        message,
        choices,
      },
    ];

    const { id } = await inquirer.prompt(questions);

    return id;
  }

  static async optionsMenu(): Promise<string> {
    ConsoleAdapter.showTitle();
    

    const { option } = await inquirer.prompt(this.questions);

    return option;
  }

  static async pause(): Promise<void> {
    const question: Questions[] = [
      {
        type: "input",
        name: "enter",
        message: `${chalk.yellow("Presione")} ${chalk.blueBright(
          "ENTER"
        )} ${chalk.yellow("para continuar")}`,
      },
    ];

    console.log("\n");

    await inquirer.prompt(question);
  }

  static async readInput(message: string): Promise<string> {
    const question: Questions[] = [
      {
        type: "input",
        name: "description",
        message,
        validate(value: string) {
          if (value.length === 0) return "Por favor ingrese un valor";

          return true;
        },
      },
    ];

    const { description } = await inquirer.prompt(question);

    return description;
  }

  static showTitle(): void {
    // console.clear();

    const title = [
      chalk.yellowBright.bold("Bienvenido"),
      chalk.blueBright.bold("a"),
      chalk.hex("#f9ec42").bold("Dragón"),
      chalk.redBright.bold("Ball"),
      chalk.blueBright.bold.italic("Sparking"),
      chalk.yellowBright.bold.italic("Zero"),
    ];

    const horizontalLine = chalk.dim.bold.strikethrough("=".repeat(40));

    console.log(horizontalLine);
    console.log(title.join(" "));
    console.log(horizontalLine,"\n");
  }
}
