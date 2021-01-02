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
    let query = "SELECT " + _field + " FROM users.user_data WHERE USER_NAME=?"
    const [row, field] = await default_dbCon.promise().query(query, [_userName]);

    if(await row.length === 0){
        return("DNE");
    }
    return row[0][_field];

}

function setUserData(_userName, _field, _data) {
    let query = "UPDATE users.user_data SET " + _field + "=? WHERE USER_NAME=?";
    default_dbCon.query(query, [_data, _userName], function (err, res, fields){
        if(err) {console.log(err);}
        // console.log(res);
    });
}

function setUserPassword(_userName, _password) {
    setUserData(_userName, "USER_PASSWORD", _password);

}

async function checkUserName(_userName, _password){
    let res = await getUserData("root", "USER_PASSWORD");


    if(res === null){
        console.log("USER HAS NO PASSWORD");
        return("NO_PASS")
    }
    else if(res === "DNE"){
        console.log("User name or password is incorrect");
        return res;
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

function disconnect(){
    default_dbCon.end();
}



export {
    connect as ex_connect,
    checkUserName as ex_checkUserName,
    setUserPassword as ex_setUserPassword,
    disconnect as ex_disconnect
}



