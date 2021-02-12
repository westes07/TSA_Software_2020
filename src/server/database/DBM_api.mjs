import{DBM_initDB} from "./DBM.mjs";
import {
    DBM_setUserData,
    DBM_getUserData,
    DBM_getUserInfo,
    DBM_getUserRules
} from "./DBM_user.mjs"

function setUserPassword(_userName, _password) {
    DBM_setUserData(_userName, "USER_PASSWORD", _password);

}



async function checkUserName(_userName, _password){
    let res = await DBM_getUserData(_userName, "USER_PASSWORD");


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


export {
    DBM_initDB as DBM_initDB,
    checkUserName as db_checkUserName,
    DBM_getUserRules as db_getUserRules,
    DBM_getUserInfo as db_getUserInfo

}

