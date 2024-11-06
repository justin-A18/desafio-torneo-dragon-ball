import yargs from "yargs/yargs";

import { CalculatorADapter } from "../adapters";
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
    if (!roles.includes(argv.r)) throw "Error: Role must be 'player' or 'admin'";
    
    if (isNaN(argv.t)) throw "Error: Tournament must be a number";
    if(!CalculatorADapter.isPowerOfTwo(argv.t)) throw "Error: Tournament must be a power of 2";

    return true;
  })
  .parseSync();
