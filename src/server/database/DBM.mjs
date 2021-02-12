import {createRequire} from 'module'

const require = createRequire(import.meta.url);
const mysql = require("mysql2");
const util = require("util");
const fs = require("fs");



let user_dbCon;
let emp_dbCon;

function initDB(_dbInfo){
    user_dbCon = mysql.createConnection({
        host: _dbInfo.address,
        user: _dbInfo.user.userName,
        password: _dbInfo.user.password,
        database:"users"
    });

    emp_dbCon = mysql.createConnection({
        host: _dbInfo.address,
        user: _dbInfo.emp.userName,
        password: _dbInfo.emp.password,
        database:"emp"
    });
}

function connect(_dbCon){
    _dbCon.connect(function (err){
        if(err){
            console.error(err);
            return;
        }
        console.log("Connected to Database");
    });

}
function disconnect(_dbCon){
    _dbCon.end();
}

function setData(_dbCon, _query){
    connect(_dbCon);
    _dbCon.query(_query, function (err, res, fields){
        if(err) {
            console.error(err);
        }
        disconnect(_dbCon);
    });
}

async function getData(_dbCon, _query){
    connect(_dbCon);
    const [row, field] = await _dbCon.promise().query(_query);
    if(await row.length === 0){
        return "DNE";
    }
    console.log(await row);
    return await row[0];
}





export {
    user_dbCon as user_dbCon,
    emp_dbCon as emp_dbCon,
    setData as DBM_setData,
    getData as DBM_getData,
    initDB as DBM_initDB
}



