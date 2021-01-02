import * as db from "../server/server_code/database/databaseManagement.mjs"
let needPass= false;
async function checkData(){

    if(await db.ex_checkUserName(document.getElementById("userName").value, "") === "NO_PASS"){
        document.getElementById("passwordMatch").style.display="initial";
        console.log("Need Pass");
        needPass = true;
    }
    else if(needPass){
        if(document.getElementById("passwordMatch").value === document.getElementById("password").value) {
            db.ex_setUserPassword(document.getElementById("userName").value, document.getElementById("password").value);
            console.log("password set");
        }
        needPass = false;
    }
    else if(!needPass){
        if(await db.ex_checkUserName(document.getElementById("userName").value,  document.getElementById("password").value)){
            console.log("Log in!")
        }
    }
}

window.checkData = checkData;