import {DBM_getData, DBM_setData, DBM_updateData, user_dbCon} from "./DBM.mjs";

async function getUserData(_userName, _field) {
    let query = "SELECT users.user_data." + _field + " FROM users WHERE users.user_data.ACCOUNT_NAME=\'" + _userName+"\'";
    const res = await DBM_getData(user_dbCon, query);

    return res[_field];

}


function setUserData(_jsonToSet) {
    DBM_setData(user_dbCon, _jsonToSet);
}

async function updateUserData(_userName, _field, _data) {
    //So for some reason
    console.log("updating account: " + _userName);
    console.log("in field: " + _field);
    console.log("data: " + _data);
    let query = "SELECT users.id FROM users WHERE users.user_data.ACCOUNT_NAME=\'" + _userName + "\'";
    let id = await DBM_getData(user_dbCon, query);
    query = "SELECT * from users WHERE users.id=\'" + id.id + "\'";
    _field = _field.split('.');
    let oldData = await DBM_getData(user_dbCon, query);
    oldData[_field[0]][_field[1]] = _data;


    DBM_updateData(user_dbCon, id.id, oldData);

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

async function getUserEmpId(_userName){
    let query = "SELECT users.user_data.EMP_ID FROM users WHERE users.user_data.ACCOUNT_NAME=\'" + _userName + "\'";
    let res = await DBM_getData(user_dbCon, query);
    if (res === "DNE" || res === {}){
        return "NONE";
    }
    return res;

}

export {
    getUserData as DBM_getUserData,
    setUserData as DBM_setUserData,
    updateUserData as DBM_updateUserData,
    getUserRules as DBM_getUserRules,
    getUserInfo as DBM_getUserInfo,
    getUserEmpId as DBM_getUserEmpId
}

