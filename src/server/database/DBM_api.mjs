import{DBM_initDB} from "./DBM.mjs";
import {
    DBM_setUserData,
    DBM_getUserData,
    DBM_getUserInfo,
    DBM_getUserRules
} from "./DBM_user.mjs"
import {
    DBM_checkIfTimesheetExists,
    DBM_createTimesheetEntry,
    DBM_checkEmployeeRecord
} from "./DBM_emp.mjs";

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

async function updateTimesheet(_punchTime, _punchType, _empId){
    let res = await DBM_checkEmployeeRecord(_empId);
    if(await res !== "VALID") {
        return {status: await res};
    }
    if(!await DBM_checkIfTimesheetExists(_empId)){
        if(_punchType !== "shiftStart"){
            return {status: "Violation: Employee is not clocked in"};
        }

        DBM_createTimesheetEntry(_punchTime, _punchType, _empId);
    } else {

    }

}



export {
    DBM_initDB as DBM_initDB,
    checkUserName as db_checkUserName,
    DBM_getUserRules as db_getUserRules,
    DBM_getUserInfo as db_getUserInfo,
    updateTimesheet as db_updateTimesheet

}

