import {db_checkUserName, db_getUserInfo, db_getUserRules, db_checkSessionID} from "../../database/DBM_api.mjs";
import { createRequire } from 'module'
import {DBM_getUserData, DBM_setUserData} from "../../database/DBM_user.mjs";
import {DBM_checkEmployeeRecord} from "../../database/DBM_emp.mjs";
const require = createRequire(import.meta.url);
const fs = require("fs");


async function auth_manager(req, res) {
    //todo move this to a the DBM API
    console.log("User: " + req.body.userName + " is attempting to log in");

    if(global.devNoServer) {
        let snd = JSON.parse(
            fs.readFileSync("config/no_db_auth_file.json", null)
        );
        snd.sessionID.sessionID = generateSessionID(req.body.userName);
        snd.sessionID.expires = expires;
        res.send( snd );
        return;
    }
    const data = req.body;
    let result = {
        rules:{
            allowedPages:{}
        }
    }

    //todo add error cases
    if (await db_checkUserName(data.userName, data.password, data.sessionID)){
        result.authSuccessful = true;
        result.status = "pending";
        const dbRes = await db_getUserInfo(data.userName);
        result.position = dbRes.POSITION;
        result.firstName = dbRes.FIRST_NAME;
        if(result.position === "Developer"){
            result.developer = true;
        }
        result.rules.allowedPages = await db_getUserRules(data.userName);
        result.status = "valid";
        result.sessionID = {
            sessionID: generateSessionID(data.userName),
            expires:expires,
            status:"VALID"
        };
        // console.log(result);
        res.send(result);

    }else{
        res.send({authSuccessful: false});

    }
}


const expires = (60*60);//temp 1 hour
async function generate_session_ID(req, res) {

    if(await db_checkSessionID(req.userName,req.sessionID)!==1){
        res.send( {status: "INVALID"});
        return;
    }


    // let sent = req;
    const snd = generateSessionID(req.userName);


    // sendData();




    console.log(req);
    const send = {
        sessionID: snd,
        expires:expires,
        status:"VALID"
    };
    res.send(send);
}

function generateSessionID(_username) {
    const crypto = require('crypto');
    const ret = crypto.randomInt(1,2**48-1);
    const exp = expires * 1000 + 60000 + Date.now();    //60000 is one minute "grace period"
    const sessionID = {"sessionID":ret, "expires":exp};

    // TODO: store sessionID, not currently working
    DBM_setUserData(_username,"USER_SESSION_ID.sessionID",sessionID.sessionID);
    DBM_setUserData(_username,"USER_SESSION_ID.expires",sessionID.expires);

    return ret;
}



export {generate_session_ID as fm_generate_session_ID}
export {auth_manager as fm_auth_manager}