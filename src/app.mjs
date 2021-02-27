import { createRequire } from 'module'
const require = createRequire(import.meta.url);
const fs = require("fs");
const path = require("path")
import {ex_startHttpServer} from "./server/server.mjs";
import {ex_startRestServer} from "./server/server.mjs";
import {DBM_initDB} from "./server/database/DBM_api.mjs";


let configFile = process.argv[2] || "config/config.json";

global.devNoServer = process.argv[3] === "--no_db";

console.log("INFO: Loading Config File: " + configFile);


configFile = path.normalize(configFile);


if(!fs.existsSync(configFile)){
    console.log("ERROR: Config file does not exist at ", configFile);
    process.exit(0);
}


const parsedConfig = JSON.parse(fs.readFileSync(configFile, null));




try{
    if(!global.devNoServer)
        DBM_initDB(parsedConfig.database);
} catch (err){
    console.error(err);
}

ex_startRestServer(parsedConfig.rest);
ex_startHttpServer("src/client");

