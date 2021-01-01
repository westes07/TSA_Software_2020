import { createRequire } from 'module'
const require = createRequire(import.meta.url);
const mysql = require("mysql2");

let default_dbCon;

function connect(_ipAddress, _userName, _password){

    default_dbCon = mysql.createConnection({
        host: _ipAddress,
        user: _userName,
        password: _password,
    });


    default_dbCon.connect(function (err){
        if(err) return
        // default_dbCon.query("")
        console.log("INFO: Connected to db server");
    });
}

function sendCommand(_command){
    default_dbCon.query(_command, function(err, result){
        console.log(result);
    });
}

function disconnect(){
    default_dbCon.end();
}

export {
    connect as ex_connect,
    sendCommand as ex_sendCommand,
    disconnect as ex_disconnect
}



