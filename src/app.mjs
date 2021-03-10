import { createRequire } from 'module'
const require = createRequire(import.meta.url);
const fs = require("fs");
const path = require("path");

import {
    ex_startHttpServer,
    ex_startRestServer
} from "./server/server.mjs";
import {DBM_initDB} from "./server/database/DBM_api.mjs";
import {ex_setup} from "./setup/setup.mjs"

let configFile;
let argc = process.argv.length;
if (argc <= 2){// There needs to be at least a config file defined
    //change this to print a help page instead
    console.error("ERROR: No config file");
    process.exit(0);
} else {
    if(process.argv[2] === "--new"){
        // run first run config stuff
        console.log("INFO: Entering Setup");

        await ex_setup();
        process.exit(0);
    }

    //first parameter must be the config file
    if(!process.argv[2].includes(".json")) {
        console.error("ERROR: Config file must be the first parameter");
        process.exit(0);
    }
    configFile = process.argv[2];

    let remainingArgs = "";
    for(let i = 2; i < argc; i++) {
        remainingArgs += process.argv[i];
    }

    global.noDatabase = remainingArgs.includes("--nD");
    global.devMode = remainingArgs.includes("--dev");

}

console.log("INFO: Loading Config File: " + configFile);


configFile = path.normalize(configFile);


if(!fs.existsSync(configFile)){
    console.log("ERROR: Config file does not exist at ", configFile);
    process.exit(0);
}


const parsedConfig = JSON.parse(fs.readFileSync(configFile, null));
if (!global.noDatabase) {
    if (parsedConfig.database_config.usingCloud && !parsedConfig.database_config.loadAuthInfoFromEnv) {
        console.error("ERROR: Cloud API Keys must be loaded from environment variables");
        console.error("WARN: Please regenerate your API keys as they may be compromised");
        process.exit(0);
    } else if (parsedConfig.database_config.usingCloud && parsedConfig.database_config.loadAuthInfoFromEnv) {
        if (!process.env.TSA_2020_DB_KEY) {
            console.error("ERROR: Database API key does not exist");
            process.exit(0);
        }

        parsedConfig.database_config.emp.authKey = process.env.TSA_2020_DB_KEY;
        parsedConfig.database_config.user.authKey = process.env.TSA_2020_DB_KEY;

    } else {
        console.error("ERROR: Unhanded DB load case");
        process.exit(0);
    }
}


try{
    if(!global.noDatabase)
        DBM_initDB(parsedConfig.database_config);
    else{}

    ex_startRestServer(parsedConfig.rest_server);
    ex_startHttpServer("src/client");

} catch (err){
    console.error(err);
}

