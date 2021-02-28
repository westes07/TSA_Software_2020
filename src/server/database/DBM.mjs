import {createRequire} from 'module'

const require = createRequire(import.meta.url);
const mysql = require("mysql2");
const util = require("util");
const fs = require("fs");
const CosmosClient = require("@azure/cosmos").CosmosClient;

let usingCloud = false;
let cloud_dbCon;
let user_dbContainer;
let emp_dbContainer;

function initDB(_dbInfo){

    if(_dbInfo.usingCloud){
        const client = new CosmosClient({endpoint: _dbInfo.address, key: _dbInfo.emp.authKey});
        cloud_dbCon = client.database(_dbInfo.cloudDBName);
        user_dbContainer = cloud_dbCon.container("users");
        emp_dbContainer = cloud_dbCon.container("emp");
        usingCloud = true;
        return;
    }

    user_dbContainer = mysql.createConnection({
        host: _dbInfo.address,
        user: _dbInfo.user.userName,
        password: _dbInfo.user.password,
        database:"users"
    });

    emp_dbContainer = mysql.createConnection({
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

async function cloudQuery(_dbCon, _query) {
    let result;
    try {
        const item = await _dbCon.items
            .query({query: _query})
            .fetchAll();

        // console.log(item);
        result = item.resources;
    } catch (e) {
        console.error(e.message);
        result = "ERROR";
    }
    return result;
}

async function localQuery(_dbCon, _query) {
    let result;
    try {
        const [row, field] = await _dbCon.promise().query(_query)
        result = row;
    } catch (e) {
        console.error(e.message);
        result = "ERROR";
    }
    return result;
}

function setData(_dbCon, _query){
    // connect(_dbCon);
    usingCloud ? cloudQuery(_dbCon, _query) : localQuery(_dbCon, _query);

}

function updateData(_dbCon, _query){
    usingCloud ? cloudQuery(_dbCon, _query) : localQuery(_dbCon, _query);
}

async function getData(_dbCon, _query) {
    // connect(_dbCon);
    let result = usingCloud ? await cloudQuery(_dbCon, _query) : await localQuery(_dbCon, _query);

    if(result.length === 0){
        return "DNE";
    }
    if(result === "ERROR"){
        return "ERROR";
    }

    console.log(result[0]);
    return result[0];
}
async function getDataArray(_dbCon, _query){
    // connect(_dbCon);
    let result = usingCloud ? await cloudQuery(_dbCon, _query) : await localQuery(_dbCon, _query);

    if(result.length === 0){
        return "DNE";
    }
    if(result === "ERROR"){
        return "ERROR";
    }

    console.log(result);
    return result;
}





export {
    user_dbContainer as user_dbCon,
    emp_dbContainer as emp_dbCon,
    setData as DBM_setData,
    updateData as DBM_updateData,
    getDataArray as DBM_getDataArray,
    getData as DBM_getData,
    initDB as DBM_initDB
}



