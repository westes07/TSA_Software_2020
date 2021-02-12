import {DBM_getData, DBM_setData, user_dbCon} from "./DBM.mjs";

async function getUserData(_userName, _field) {
    if(_field === "*") {
        console.log("Wild card operations are not allowed");
        return("ERROR");
    }
    let query = "SELECT " + _field + " FROM users.user_data WHERE ACCOUNT_NAME=\'" + _userName+"\'";
    const res = await DBM_getData(user_dbCon, query);

    return res[_field];

}

function setUserData(_userName, _field, _data) {
    let query = "UPDATE users.user_data SET " + _field + "=" + _data+"WHERE ACCOUNT_NAME=\'" + _userName+"\'";
    DBM_setData(user_dbCon, query);
}

async function getUserRules(_userName){
    let query = "SELECT overview_allowed, time_clock_allowed, employee_manager_allowed FROM users.user_rules WHERE ACCOUNT_NAME=\'" + _userName+"\'";
    return await DBM_getData(user_dbCon, query);
}

async function getUserInfo(_userName){
    let query = "SELECT FIRST_NAME, POSITION FROM users.user_data WHERE ACCOUNT_NAME=\'" + _userName+"\'";
    return await DBM_getData(user_dbCon, query);
}


export {
    getUserData as DBM_getUserData,
    setUserData as DBM_setUserData,
    getUserRules as DBM_getUserRules,
    getUserInfo as DBM_getUserInfo

}

