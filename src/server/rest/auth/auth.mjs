import * as db from "../../server_code/database/databaseManagement.mjs"

function auth_manager(req, res) {
    console.log(req.body);
    res.send({
        authSuccessfull: true
    });

}



export {auth_manager as fm_auth_manager}