import {UA_sendData, UA_sendDataFull, UA_getSessionIDCookie, UA_getUserNameCookie} from "./modules/userAccount.js"


try{
    const sessionID = UA_getSessionIDCookie();
    const userName = UA_getUserNameCookie();
    UA_sendDataFull(userName,sessionID)
} catch (no){
    console.log(no);
}

window.restLocation = window.location.hostname; //change this to be more dynamic 

document.getElementById("submit").addEventListener("click", UA_sendData);