import {DBM_getDataArray, DBM_setData, DBM_getData, emp_dbCon} from "./DBM.mjs";


async function getCurrentPunches(_empId){
    let query = "SELECT * FROM emp.time_sheet WHERE EMP_ID=" + _empId;
    const res = JSON.parse(JSON.stringify(await DBM_getDataArray(emp_dbCon, query)));
    if (await res === "DNE")
        return false;
    let formatted = {
        status: "",
        punches: []
    }
    for(let i = 0; i < res.length; i++){
        formatted.punches[i] = {
            punch: res[i].PUNCH_TIME,
            punchType: res[i].PUNCH_TYPE
        }
    }
    formatted.status = formatted.punches[formatted.punches.length - 1].punchType;
    return formatted;
}

function createTimesheetEntry(_punchTime, _punchType, _empId){
    let query =
        "INSERT INTO emp.time_sheet(EMP_ID, PUNCH_TIME, PUNCH_TYPE) " +
        "VALUES(" + _empId + "," + _punchTime + ",\'" +  _punchType + "\');";

    DBM_setData(emp_dbCon, query);
}

async function checkEmployeeRecord(_empId) {
    let query = "SELECT EMP_FIRST, EMP_WAGE FROM emp.employee_data WHERE EMP_ID=" + _empId;
    const res = await DBM_getData(emp_dbCon, query);
    if(await res === "DNE"){
        return "Invalid Employee ID";
    }
    if(await res.EMP_FIRST === null || await res.EMP_WAGE === null){
        return "Incomplete Employee Record";
    }
    return "VALID";

}

function getTimesheetEntry(_empId){

}


export {
    checkEmployeeRecord as DBM_checkEmployeeRecord,
    getCurrentPunches as DBM_getCurrentPunches,
    createTimesheetEntry as DBM_createTimesheetEntry
}