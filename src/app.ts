import { ServerApp } from "./presentation/server-app";
import { yarg } from "./config/plugins/args.plugin";

(async () => {
  await main();
})();

async function main() {
  const { r: role } = yarg;
  
  ServerApp.run({ role });
}
