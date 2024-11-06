import { ServerApp } from "./presentation";
import { yarg } from "./config/plugins/args.plugin";

(async () => {
  await main();
})();

async function main() {
  const { r: role, t: tournament } = yarg;

  ServerApp.run({ role, nroOfFighters: tournament });
}
