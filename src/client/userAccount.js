import {UI_initializeUi} from "./ui.js";
import {sha1} from "./encryption.js";


function sendData(e){
    e.preventDefault();
    document.getElementById("sign_in_form").style.display = "none";
    document.getElementById("sign_in_post_message").style.display = "block";

    const userName = document.getElementById("userName").value;
    const password = document.getElementById("password").value;
    document.getElementById("password").value = "";

    fetch("http://localhost:8081/auth/manager", {
        method:"POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userName: userName,
            password: password

        })
    }
        
    ).then(res => res.json())
    .then(data => {signIn(data)})
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
function hashPass(username, password) {
    return sha1(password+username);//just the easiest way to implement a SALT
}

function verifyValid(username, password){
    return true;//temp
}

export{signIn as UA_signIn}
export{sendData as UA_sendData}