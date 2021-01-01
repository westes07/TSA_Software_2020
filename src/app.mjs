import { createRequire } from 'module'
const require = createRequire(import.meta.url);
const fs = require("fs");
const path = require("path")
import {ex_startServer} from "./server/http/server.mjs";
import {ex_firstRun} from "./server/firstRun.mjs";

let configFile = process.argv[2] || "config/config.json";

console.log("INFO: Loading Config File");

configFile = path.normalize(configFile); //cleans the

if(!fs.existsSync(configFile)){
    console.log("ERROR: Config file does not exist at ", configFile);
    process.exit(0);
}
let parsedConfig = JSON.parse(fs.readFileSync(configFile, null));


ex_firstRun(parsedConfig.database);
console.log(parsedConfig);



// ex_startServer("src/client");

