import { createRequire } from 'module'
const require = createRequire(import.meta.url);
const fs = require("fs");
const path = require("path")
import {ex_startHttpServer} from "./server/http/server.mjs";
import {ex_startRestServer} from "./server/http/server.mjs";

let configFile = process.argv[2] || "config/config.json";

console.log("INFO: Loading Config File");

configFile = path.normalize(configFile); //cleans the

if(!fs.existsSync(configFile)){
    console.log("ERROR: Config file does not exist at ", configFile);
    process.exit(0);
}
let parsedConfig = JSON.parse(fs.readFileSync(configFile, null));





ex_startRestServer(parsedConfig.rest);
ex_startHttpServer("src/client");

