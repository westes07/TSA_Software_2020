import * as db from "./server_code/database/databaseManagement.mjs"


function firstRun(_databaseJSON){
    db.ex_connect(_databaseJSON.ipAddress, _databaseJSON.username, _databaseJSON.password, null);
    db.ex_sendCommand( "CREATE DATABASE emp;");
    db.ex_sendCommand("USE emp; create table timesheet()se ")
    db.ex_sendCommand("CREATE DATABASE users;")
}


export {firstRun as ex_firstRun};