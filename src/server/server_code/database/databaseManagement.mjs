import {createRequire} from 'module'

const require = createRequire(import.meta.url);
const mysql = require("mysql2");
const util = require("util");

let default_dbCon;

function connect(_ipAddress, _userName, _password){

    default_dbCon = mysql.createConnection({
        host: _ipAddress,
        user: _userName,
        password: _password,
    });


    default_dbCon.connect(function (err){
        if(err) return
        console.log("INFO: Connected to db server");
    });

    // default_dbCon.query = util.promisify(default_dbCon.query);
}

async function getUserData(_userName, _field) {
    if(_field === "*") {
        console.log("Wild card operations are not allowed");
        return("ERROR");
    }
    let query = "SELECT " + _field + " FROM users.user_data WHERE ACCOUNT_NAME=?"
    const [row, field] = await default_dbCon.promise().query(query, [_userName]);

    if(await row.length === 0){
        return("DNE");
    }
    return row[0][_field];

}

async function getUserRules(_userName){
    let query = "SELECT overview_allowed, time_clock_allowed FROM users.user_rules WHERE ACCOUNT_NAME=?";
    const [row, field] = await default_dbCon.promise().query(query, [_userName]);
    if(await row.length === 0){
        return("DNE");
    }
    return row[0];
}

function setUserData(_userName, _field, _data) {
    let query = "UPDATE users.user_data SET " + _field + "=? WHERE ACCOUNT_NAME=?";
    default_dbCon.query(query, [_data, _userName], function (err, res, fields){
        if(err) {console.log(err);}
        // console.log(res);
    });
}

function setUserPassword(_userName, _password) {
    setUserData(_userName, "USER_PASSWORD", _password);

}

async function checkUserName(_userName, _password){
    let res = await getUserData(_userName, "USER_PASSWORD");


    if(res === null){
        console.log("USER HAS NO PASSWORD");
        return("NO_PASS")
    }
    else if(res === "DNE"){
        console.log("User name or password is incorrect");
        return false;
    }else {
        // console.log(res);
    }

    if(_password === res){
        console.log("Passwords Match!");
        return true;
    } else{
        console.log("User name or password is incorrect")
        return false;
    }

}

async function getUserInfo(_userName){
    let firstName = await getUserData(_userName, "FIRST_NAME");
    let pos = await getUserData(_userName, "POSITION");
    return {
        firstName: await firstName,
        position: await pos
    };
}

function disconnect(){
    default_dbCon.end();
}



export {
    connect as ex_connect,
    checkUserName as ex_checkUserName,
    getUserInfo as ex_getUserInfo,
    getUserRules as ex_getUserRules,
    setUserPassword as ex_setUserPassword,
    disconnect as ex_disconnect
}



