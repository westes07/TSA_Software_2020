import {DBM_getDataArray, DBM_setData, DBM_getData, DBM_updateData, emp_dbCon, timesheet_dbCon} from "./DBM.mjs";


async function getCurrentPunches(_empId){
    let query = "SELECT * FROM timesheets WHERE timesheets.EMP_ID=\'" + _empId + "\'";
    const res = await JSON.parse(JSON.stringify(await DBM_getDataArray(timesheet_dbCon, query)));
    if (res === "DNE")
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
    // PURE SQL. But ms is special and doesnt support sql creation :/
    // let query =
    //     "INSERT INTO time_sheet(EMP_ID, PUNCH_TIME, PUNCH_TYPE) " +
    //     "VALUES(" + _empId + "," + _punchTime + ",\'" +  _punchType + "\');";

    let query = {
        EMP_ID: _empId,
        PUNCH_TIME: _punchTime,
        PUNCH_TYPE: _punchType
    }

    DBM_setData(timesheet_dbCon, query);
}

async function checkEmployeeRecord(_empId) {
    let query = "SELECT emp.employee_data.EMP_FIRST, emp.employee_data.EMP_WAGE FROM emp WHERE emp.employee_data.EMP_ID=\'" + _empId + "\'";
    const res = await DBM_getData(emp_dbCon, query);
    if(await res === "DNE"){
        return "Invalid Employee ID";
    }
    if(await res.EMP_FIRST === null || await res.EMP_WAGE === null){
        return "Incomplete Employee Record";
    }
    return "VALID";

}

async function getEmployeeList(){
    let query = "SELECT emp.employee_data.EMP_ID, emp.employee_data.EMP_FIRST FROM emp";
    const res = await DBM_getDataArray(emp_dbCon, query);
    return res;
}

async function getEmployeeData(_empId){
    let query = "SELECT emp.employee_data FROM emp WHERE emp.employee_data.EMP_ID=\"" + _empId + "\"";
    const res = await DBM_getData(emp_dbCon, query);
    return res; 
}


async function updateEmployeeData(_empId, _newData){
    let query = "SELECT emp.id FROM emp WHERE emp.employee_data.EMP_ID=\'" + _empId + "\'";
    let id = await DBM_getData(emp_dbCon, query);
    query = "SELECT * from emp WHERE emp.id=\'" + id.id + "\'";
    let oldData = await DBM_getData(emp_dbCon, query);
    oldData.employee_data = _newData;

    DBM_updateData(emp_dbCon, id.id, oldData);


}

async function createEmployeeData(_newData){
    let query = {
        employee_data: _newData
    }

    DBM_setData(emp_dbCon, query);

}

function getTimesheetEntry(_empId){

}


export {
    checkEmployeeRecord as DBM_checkEmployeeRecord,
    getCurrentPunches as DBM_getCurrentPunches,
    getEmployeeList as DBM_getEmployeeList,
    getEmployeeData as DBM_getEmployeeData,
    updateEmployeeData as DBM_updateEmployeeData,
    createEmployeeData as DBM_createEmployeeData,
    createTimesheetEntry as DBM_createTimesheetEntry
}