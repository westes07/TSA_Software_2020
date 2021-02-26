import {db_updateTimesheet} from "../../database/DBM_api.mjs";


async function timeclock_punch(req, res) {
    const data = req.body;
    console.log(data);

    if(global.devNoServer){
        let result = {
            status: "No DB connection, Punches are not logged",
            punches: [{
                punch: data.punchTime,
                punchType: data.punchType
            }]
        }

        res.send(result);
        return;
    }
    const result = await db_updateTimesheet(data.punchTime, data.punchType, data.empID);
    res.send(result);



}

function timeclock_overrideEmployee(req, res){

}


function timeclock_calcEmployee(req, res){

}

export {timeclock_punch as fm_timeclock_punch}