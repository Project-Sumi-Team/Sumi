const { spawnSync } = require("child_process");
const args = ["-y", "neon@latest", "init", "--agent", "--data", '{"step":"getting-started","features":["database","auth"]}'];
const res = spawnSync("npx", args, { stdio: "inherit" });
process.exit(res.status);