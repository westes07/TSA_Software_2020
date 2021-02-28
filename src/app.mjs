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

if(parsedConfig.database.usingCloud && !parsedConfig.database.loadAuthInfoFromEnv){
    console.error("ERROR: API Keys must be loaded from environment variables");
    process.exit(0);
} else if(parsedConfig.database.usingCloud && parsedConfig.database.loadAuthInfoFromEnv){
    if(!process.env.TSA_2020_DB_KEY){
        console.error("ERROR: Database API key does not exist");
        process.exit(0);
    }

    parsedConfig.database.emp.authKey = process.env.TSA_2020_DB_KEY;
    parsedConfig.database.user.authKey = process.env.TSA_2020_DB_KEY;

} else {
    console.error("ERROR: Unhanded DB load case");
    process.exit(0);
}



try{
    if(!global.devNoServer)
        DBM_initDB(parsedConfig.database);
} catch (err){
    console.error(err);
}

ex_startRestServer(parsedConfig.rest);
ex_startHttpServer("src/client");

