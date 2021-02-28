import {createRequire} from 'module'

const require = createRequire(import.meta.url);
const mysql = require("mysql2");
const util = require("util");
const fs = require("fs");
const CosmosClient = require("@azure/cosmos").CosmosClient;

let cloudConfig= {};
let usingCloud = false;
let cloud_dbCon;
let user_dbContainer;
let emp_dbContainer;

function initDB(_dbInfo){

    if(_dbInfo.usingCloud){
        cloudConfig = {
            endpoint: _dbInfo.address,
            key: _dbInfo.emp.authKey,
            databaseId: _dbInfo.cloudDBName,
            partitionKey: { kind: "Hash", paths: ["/category"]}
        };
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

function setData(_dbCon, _query){
    // connect(_dbCon);
    _dbCon.query(_query, function (err, res, fields){
        if(err) {
            console.error(err);
        }
        // disconnect(_dbCon);
    });
}

async function updateData(_dbCon, _query){
    // connect(_dbCon);
    const [row, field] = _dbCon.promise().query(_query)
        .catch(err => console.error(err));
    if(await row.length === 0){
        return "DNE";
    }
    console.log(await row);
    return await row[0];
}

async function getData(_dbCon, _query) {
    // connect(_dbCon);
    if (usingCloud) {
        const {resource: item} = await _dbCon.items
            .query({query: _query})
            .fetchAll();

        console.log(item[0]);
        return item[0];
    }
    const [row, field] = await _dbCon.promise().query(_query);
    if(await row.length === 0){
        return "DNE";
    }
    console.log(await row[0]);
    return await row[0];
}
async function getDataArray(_dbCon, _query){
    // connect(_dbCon);
    const [row, field] = await _dbCon.promise().query(_query);
    if(await row.length === 0){
        return "DNE";
    }
    console.log(await row);
    return await row;
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



