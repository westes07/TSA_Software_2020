import {db_updateTimesheet, db_getCurrentPunches, db_checkSessionID} from "../../database/DBM_api.mjs";
import {DBM_getUserRules} from "../../database/DBM_user.mjs";


async function timeclock_punch(req, res) {
    const data = req.body;
    // console.log(req.body);
    if(await db_checkSessionID(data.userName, data.sessionID) !== 1){
        res.send({status:"invalid username or sessionID"});
        return;
    }
    if((await DBM_getUserRules(data.userName)).time_clock_allowed !== 1){
        res.send({status:"invalid permissions"});
        return;
    }

    if(global.devNoServer){
        let result = {
            status: "No DB connection, Punches are not logged",
            punches: [{
                punch: data.punchTime,
                punchType: data.punchType
            }]
        };

        res.send(result);
        return;
    }
    const result = await db_updateTimesheet(data.punchTime, data.punchType, data.empID);
    res.send(result);

}
async function timeclock_getPunches(req, res){
    const data = req.body;
    // console.log(req.body);
    if(await db_checkSessionID(data.userName, data.sessionID) !== 1){
        res.send({status:"invalid username or sessionID"});
        return;
    }
    if((await DBM_getUserRules(data.userName)).time_clock_allowed !== 1){
        res.send({status:"invalid permissions"});
        return;
    }

    if(global.devNoServer){
        res.send({status: "ERROR: DB connection error"});
        return;
    }

    let result = await db_getCurrentPunches(data.empID);
    if(!result){
        res.send({status: "No punches exist"});
        return;
    }
    result.status = "VALID";
    res.send(result);

}

function timeclock_overrideEmployee(req, res){

}


function timeclock_calcEmployee(req, res){

}

export {
    timeclock_punch as fm_timeclock_punch,
    timeclock_getPunches as fm_timeclockCurrent
}