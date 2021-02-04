import * as db from "../../server_code/database/databaseManagement.mjs"
import { createRequire } from 'module'
const require = createRequire(import.meta.url);
const fs = require("fs");


async function auth_manager(req, res) {
    if(global.devNoServer) {
        res.send(JSON.parse(
            fs.readFileSync("config/no_db_auth_file.json", null)
        ));
        return;
    }
    const data = req.body;
    let result = {}

    db.ex_connect("127.0.0.1", "db_user_auth", "")
    if (await db.ex_checkUserName(data.userName, data.password)){
        result.authSuccessful = true;
        result.status = "pending";
        let dbRes = await db.ex_getUserInfo(data.userName);
        result.position = dbRes.position;
        result.firstName = dbRes.firstName;
        if(result.position === "Developer"){
            result.developer = true;
        }
        result.status = "valid";
        console.log(result);
        res.send(result);

    }else{
        res.send({authSuccessful: false});

    }
    db.ex_disconnect();

}



export {auth_manager as fm_auth_manager}