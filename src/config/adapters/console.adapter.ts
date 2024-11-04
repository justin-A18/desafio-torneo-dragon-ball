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
      message: "Seleccione una opción",
      choices: [
        {
          value: "1",
          name: `${chalk.blueBright("1.")} Comenzar torneo`,
        },
        {
          value: "0",
          name: `${chalk.blueBright("0.")} Salir`,
        },
      ],
    },
  ];

  static async checkMenu(options: OptionsMenu[],message: string) { 
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

  static async confirm(message: string) {
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

  static async listMenu(options: OptionsMenu[], message: string) { 
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

  static async optionsMenu() {
    console.clear();
    console.log(chalk.yellow("========================="));
    console.log(chalk.blueBright(" Seleccione una opción"));
    console.log(chalk.yellow("=========================\n"));

    const { option } = await inquirer.prompt(this.questions);

    return option;
  }

  static async pause() {
    const question: Questions[] = [
      {
        type: "input",
        name: "enter",
        message: `Presione ${chalk.blueBright("ENTER")} para continuar`,
      },
    ];

    console.log("\n");

    await inquirer.prompt(question);
  }

  static async readInput(message: string) {
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

  static async showTitle() {
    console.clear();
    console.log(chalk.yellow("========================="));
    console.log(chalk.blueBright("   Bienvenido al torneo"));
    console.log(chalk.yellow("=========================\n"));
  }
}
