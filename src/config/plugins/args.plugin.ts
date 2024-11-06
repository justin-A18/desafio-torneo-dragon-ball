import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";

export const yarg = yargs(hideBin(process.argv))
  .option("r", {
    alias: "role",
    type: "string",
    default: "player",
    description: "Role of the user",
  })
  .option("t", {
    alias: "tournament",
    type: "number",
    demandOption: true,
    description: "number of fighters in the tournament",
  })
  .check((argv) => {
    const roles = ["player", "admin"];
    if (!roles.includes(argv.r)) throw "Error: Role must be player or admin";
    
    if (isNaN(argv.t)) throw "Error: Tournament must be a number";
    // validar que argv.t sea un número potencia de 2
    // if (Math.log2(argv.t) % 1 !== 0) throw "Error: Tournament must be a power of 2";

    return true;
  })
  .parseSync();
