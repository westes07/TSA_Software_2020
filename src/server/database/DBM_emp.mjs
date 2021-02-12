import {DBM_updateData, DBM_setData, DBM_getData,emp_dbCon} from "./DBM.mjs";


async function checkIfTimesheetExists(_empId){
    let query = "SELECT * FROM emp.time_sheet WHERE EMP_ID=" + _empId;
    return await DBM_getData(emp_dbCon, query) !== "DNE";
}

function createTimesheetEntry(_punchTime, _punchType, _empId){
    const cur = new Date();
    let date = cur.getFullYear().toString() + "-" + cur.getMonth().toString() + "-" + cur.getDay().toString();
    let json = {punches: [{punch: _punchTime, punchType: _punchType}]};
    let query =
        "INSERT INTO emp.time_sheet(EMP_ID, clock_in, date) " +
        "VALUES(" + _empId + "," + json + ",\'" +  date + "\');";

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
    checkIfTimesheetExists as DBM_checkIfTimesheetExists,
    createTimesheetEntry as DBM_createTimesheetEntry
}