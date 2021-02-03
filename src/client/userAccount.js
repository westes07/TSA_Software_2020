

function sendData(e){
    e.preventDefault();
    console.log("called");

    const userName = document.getElementById("userName").value;
    const password = document.getElementById("password").value;

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

function signIn(resJSON){
    // do something with response
    console.log(resJSON);
}





export{signIn as UA_signIn}
export{sendData as UA_sendData}