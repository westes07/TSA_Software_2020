import {UI_initializeUi} from "../ui.js";
import {sha1} from "./encryption.js";

function sendData(e){
    e.preventDefault();
    sendDataFull( "", "");
}

function sendDataFull(_userName, _sessionID) {
    document.getElementById("sign_in_form").style.display = "none";
    document.getElementById("sign_in_post_message").style.display = "block";

    let userName;
    if(_userName === "")
        userName = document.getElementById("userName").value;
    else
        userName = _userName;

    const password = document.getElementById("password").value;
    document.getElementById("password").value = "";


    if(_sessionID === "")
        _sessionID = 0;
    console.log( "sending sessionID: " + _sessionID);
    console.log( "sending userName: " + userName);
    fetch("http://localhost:8081/auth/manager", {
            method:"POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userName: userName,
                password: password/*hashPass(userName,password*/,
                sessionID: _sessionID
            })
        }

    ).then(res => res.json())
        .then(data => {signIn(data), setSessionIDCookie(data,userName)})
        .catch(err => console.log(err));
}

function signIn(_resJSON){
    // do something with response
    console.log(_resJSON.authSuccessful);
    if(_resJSON.authSuccessful && _resJSON.status === "valid"){
        document.getElementById("sign_in_screen").classList.add("signed_in");
        UI_initializeUi(_resJSON);
    }
    else {
        document.getElementById("sign_in_form").style.display = "block";
        document.getElementById("sign_in_post_message").style.display = "none";
        document.getElementById("sign_in_message").style.color = "red";
        document.getElementById("sign_in_message").innerText = "unable to authenticate user";
    }
}


// both should be shorter than 32 chars

//©S0{ó`hyK2[M¯ôÄç4©S0{ó\`hyK2[M¯ôÄç4

function hashPass(username, password) {
    return sha1(password+username);//just the simplest way to implement a SALT
}

function verifyValid(username, password){
    return true;//temp
}

function getNewSessionID(_userName, _oldSessionID) {
    const empID = document.getElementById("tc_employee_id").value;
    fetch("http://localhost:8081/auth/sessionID",{
        method: "POST",
            headers: {
            Accept: "application/json",
                "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userName:_userName,
            sessionID:_oldSessionID
        })
    }).then(res => res.json())
        .then(data => setSessionIDCookie(data,_userName))
          .catch(err => console.log(err));
}

function setSessionIDCookie(_data, _userName) {
    if(_data.status === "valid") {
        const data = _data.sessionID;
        console.log(data);
        console.log(_userName);
        // console.log(_data.expires);
        if (data.status === "VALID") {
            document.cookie = "sessionID=" + data.sessionID + ";" + "max-age=" + (data.expires) + ";path=/" + ";samesite=strict";
            document.cookie = "userName=" + _userName + ";" + "max-age=" + (data.expires) + ";path=/" + ";samesite=strict";
        } else {
            console.log("invalid employee id");
        }
    }
    else{
        console.log("could not sign in");
    }
}

function getSessionIDCookie() {
    console.log(document.cookie);
    console.log(document.cookie.split('; '));
    const sid = document.cookie.split('; ')
        .find(row => row.startsWith('sessionID='));
    console.log(sid);
    if(sid===undefined)
        throw ("no session id");
    else
        return sid.split('=')[1];

}

function getUserNameCookie() {
    console.log(document.cookie);
    console.log(document.cookie.split('; '));
    const sid = document.cookie.split('; ')
        .find(row => row.startsWith('userName='));
    console.log(sid);
    if(sid===undefined)
        throw ("no username");
    else
        return sid.split('=')[1];

}

export{signIn as UA_signIn}
export{sendData as UA_sendData}
export{sendDataFull as UA_sendDataFull}
export{getSessionIDCookie as UA_getSessionIDCookie}
export{getUserNameCookie as UA_getUserNameCookie}
