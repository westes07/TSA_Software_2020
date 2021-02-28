import {DBM_getData, DBM_setData, user_dbCon} from "./DBM.mjs";

async function getUserData(_userName, _field) {
    if(_field === "*") {
        console.log("Wild card operations are not allowed");
        return("ERROR");
    }
    let query = "SELECT users.user_data." + _field + " FROM users WHERE users.user_data.ACCOUNT_NAME=\'" + _userName+"\'";
    const res = await DBM_getData(user_dbCon, query);

    return res[_field];

}

function setUserData(_userName, _field, _data) {
    let query = "UPDATE users SET users.user_data." + _field + "=" + _data+" WHERE users.user_data.ACCOUNT_NAME=\'" + _userName+"\'";
    DBM_setData(user_dbCon, query);
}

async function getUserRules(_userName){
    let query =
        "SELECT users.user_rules.overview_allowed, users.user_rules.time_clock_allowed, users.user_rules.employee_manager_allowed " +
        "FROM users WHERE users.user_rules.ACCOUNT_NAME=\'" + _userName+"\'";
    return await DBM_getData(user_dbCon, query);
}

async function getUserInfo(_userName){
    let query = "SELECT users.user_data.FIRST_NAME, users.user_data.POSITION FROM users WHERE users.user_data.ACCOUNT_NAME=\'" + _userName+"\'";
    return await DBM_getData(user_dbCon, query);
}


export {
    getUserData as DBM_getUserData,
    setUserData as DBM_setUserData,
    getUserRules as DBM_getUserRules,
    getUserInfo as DBM_getUserInfo

}

