import * as DBM from "../server/database/DBM.mjs"

function validateDbInfo(_dbConfig){


    //todo actually validate
    return _dbConfig.emp.authKey === "no";


}


export {
    validateDbInfo as s_validateDbInfo
}