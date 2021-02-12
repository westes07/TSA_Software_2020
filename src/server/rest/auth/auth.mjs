import {db_checkUserName, db_getUserInfo, db_getUserRules} from "../../database/DBM_api.mjs";
import { createRequire } from 'module'
const require = createRequire(import.meta.url);
const fs = require("fs");


async function auth_manager(req, res) {
    //todo move this to a the DBM API
    if(global.devNoServer) {
        res.send(JSON.parse(
            fs.readFileSync("config/no_db_auth_file.json", null)
        ));
        return;
    }
    const data = req.body;
    let result = {
        rules:{
            allowedPages:{}
        }
    }

    //todo add error cases
    if (await db_checkUserName(data.userName, data.password)){
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
        console.log(result);
        res.send(result);

    }else{
        res.send({authSuccessful: false});

    }
}



export {auth_manager as fm_auth_manager}