import {createRequire} from 'module'
const require = createRequire(import.meta.url)
const fs = require("fs")
const isElevated = require("is-elevated");
const readlineSync = require("readline-sync")
const color = require("colors")

import {s_validateDbInfo} from "./DBM_setup.mjs"


color.setTheme({
    header: ['bgBlue', 'brightWhite', 'bold'],
    text: ['brightWhite'],
    important: ['brightGreen', "italic"],
    question: ['brightCyan', 'italic']

})


function createUserAccount(_userInfo){

}



async function setup(){
    if(await !isElevated()) {
        console.error("FATAL: Setup must be run with sudo or admin privages");
        return;
    }
    console.clear();
    console.log("Welcome to Payroll 2020 Setup".header);
    console.log("You will need your Azure Cosmos API key, your existing employee information, and branding info.".important);
    console.log("If you would prefer to create your config files from scratch please exit this utility and refer to".important + 
                "the documentation for the required information.".important);
    if(!readlineSync.keyInYNStrict("Start setup?".question)){
        console.log("Exiting Setup".important);
        return;
    }
    console.clear();
    console.log("Database Setup".header);
    let database_config = {
        emp: {},
        user: {}
    }

    let serverConfigFilename = readlineSync.questionPath("Enter Server config file name: ".question, {
        exists:false,
        create:true,
        validate: (path) => {
            //change this function to fully create the directory that we need
            return path.includes(".json") || "Please enter the full of the file including the extension.";
        } 
    });

    database_config.usingCloud = readlineSync.keyInYNStrict("Are you using Azure Cosmos in the cloud?".question) ? 1 : 0; 
    if(database_config.usingCloud){
        console.log("Setting up cloud database config.".important);
        database_config.loadAuthInfoFromEnv = 1;
        console.log("API keys must be loaded from enviroment variables.".important);
    }
    do {
        database_config.cloudDBName = readlineSync.question("Please enter the database name: ".question);
        database_config.cloudPartitionKey = readlineSync.question("Please enter the partition key for this database: ".question);
        database_config.address = readlineSync.question("Please enter the server address including the port: ".question);
        database_config.emp.authKey = readlineSync.question("Please enter the API key: ".question);
        database_config.user.authKey = database_config.emp.authKey;
        console.log("Checking infomation. Please ensure that the database is ready and press enter when you are ready".question);
        readlineSync.keyInPause();
    } while (!s_validateDbInfo(database_config));

    console.log("Database Information has been validated".important);
}


export{
    setup as ex_setup
}

