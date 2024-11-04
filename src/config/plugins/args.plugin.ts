import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";

export const yarg = yargs(hideBin(process.argv))
  .option("r", {
    alias: "role",
    type: "string",
    default: "player",
    description: "Role of the user",
  })
  .parseSync();
