import * as db from "../../server_code/database/databaseManagement.mjs"

function auth_manager(req, res) {
    const data = req.body;
    // TODO send data to database for auth
    // This is a temp solution bc i dont have access to 
    // the database rn
    res.send({
        firstName: "Gregory",
        postion: "Developer",
        developerMode: true,
        status:"valid",
        authSuccessfull: true,
        rules: {}
    });

}



export {auth_manager as fm_auth_manager}