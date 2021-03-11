import {createRequire} from 'module'
const require = createRequire(import.meta.url)
const fs = require("fs")
const isElevated = require("is-elevated");
const readlineSync = require("readline-sync")
const color = require("colors")

import {s_validateDbInfo} from "./DBM_setup.mjs"
import {
    s_getFunctionList,
    s_generateRestData
} from "./rest_setup.mjs"
import {s_writeConfig} from "./writeData.mjs"


color.setTheme({
    header: ['bgBlue', 'brightWhite', 'bold'],
    text: ['brightWhite'],
    important: ['brightGreen', "italic"],
    question: ['brightCyan', 'italic']

})


function createUserAccount(_userInfo){

}



async function setup(){
    // if(!await isElevated()) {
    //     console.error("FATAL: Setup must be run with sudo or admin privages");
    //     return;
    // }
    console.clear();
    console.log("-----------------Welcome to Payroll 2020 Setup----------------".header);
    console.log("You will need your Azure Cosmos API key, your existing employee information, and branding info.".important);
    console.log("If you would prefer to create your config files from scratch please exit this utility and refer to".important + 
                "the documentation for the required information.".important);
    if(!readlineSync.keyInYNStrict("Start setup?".question)){
        console.log("Exiting Setup".important);
        return;
    }
    console.clear();
    console.log("------------------------Database Setup-------------------------".header);
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
        console.log("Checking infomation. Please ensure that the database is ready and press space when you are ready".question);
        readlineSync.keyInPause();
    } while (!s_validateDbInfo(database_config));

    console.log("Database Information has been validated".important);
    console.log("Writing Enviromental Variables".important);

    console.clear();
    let availableFunctions = s_getFunctionList();
    let functionsToEnable = []
    let index;
    do{
        console.clear();
        console.log("------------------------REST Setup-------------------------".header);
        if(availableFunctions.length >= 1){
            index = readlineSync.keyInSelect(availableFunctions, "Please type the number of the REST api that you would like to enable.\nYou currently have ".question +
            functionsToEnable.length+" functions enabled.\nWhen you are finished press 0.".question);
        } else if (availableFunctions.length === 1){
            console.log("[1] " +availableFunctions);
            console.log("[0] CANCEL\n\n");
            index = readlineSync.keyIn("Please type the number of the REST api that you would like to enable.\nYou currently have ".question + 
            functionsToEnable.length+" functions enabled.\nWhen you are finished press 0.".question, {limit: '$<0-1>'});
            index--;
        } else {
            break;
        }
        if(availableFunctions.length !== 1 && index !== -1)
            functionsToEnable.push(availableFunctions[index]);
        else if (index !== -1)
            functionsToEnable.push(availableFunctions[0]);
        if(index !== -1){
            availableFunctions.splice(index, 1);
        }
    }while (index !== -1)

    console.clear();
    console.log("------------------------Server Setup-------------------------".header);
    console.log("Committing your changes".important);
    const rest_server = s_generateRestData(functionsToEnable);
    console.log("Changes committed. Server setup is complete.".important)
    if(!readlineSync.keyInYNStrict("Would you like to write your changes to disk?".important)){
        console.log("Write aborted. Setup will now exit.".important);
        return;
    }
    console.log("IMPORTANT: For security and cross platform compatibility reasons this program will NOT modify your environmental variables.".important +
                "\nPlease set the \'TSA_2020_DB_KEY\' variable to the API key you set earlier.".important);
    database_config.emp.authKey = "";
    database_config.user.authKey = "";
    let serverConfig = {rest_server: rest_server, database_config: database_config};
    s_writeConfig(serverConfigFilename, serverConfig);



}


export{
    setup as ex_setup
}

