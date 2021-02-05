
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

function signIn(resJSON){
    // do something with response
    console.log(resJSON.authSuccessful);
    if(resJSON.authSuccessful && resJSON.status === "valid"){
        document.getElementById("sign_in_screen").classList.add("signed_in");
    }
    else {
        document.getElementById("sign_in_form").style.display = "block";
        document.getElementById("sign_in_post_message").style.display = "none";
        document.getElementById("sign_in_message").style.color = "red";
        document.getElementById("sign_in_message").innerText = "unable to authenticate user";
    }





}
sha1("tst");
function verifyValid(username, password){

}

//JS (semi) implementation of sha1, changed some stuff
//kinda only works for strings (might give wrong answer for ints might not)
function sha1(a) {
    let h0 = 0x67452301;
    let h1 = 0xEFCDAB89;
    let h2 = 0x98BADCFE;
    let h3 = 0x10325476;
    let h4 = 0xC3D2E1F0;//don't worry about it


    a = a.concat('Ç');//I said don't worry about it
    let len = a.length;
    if (len > 64){
        return sha1(a.slice(0,63)) ^ sha1(a.slice(63,len));
    }
    else if(len < 64){
        for(len; len < 64; len++)
            a = a.concat(0);
    }

    for(let i = 0; i < 16; i++){
        ;
    }


    return;
}


//shifts the bits with ones going off the end wrapping around
// - for left + for right
// can't shift more than length in bits
function circleShift(a,num){
    let temp;
    if(num > 1) {
        temp = a % (1 >> num);
        return ((a >> num) | temp);
    }
    else if(num < 1) {
        temp = a / (1 >> -num);
        return ((a << num) | temp);
    }
    else if(num === 0){
        return a;
    }
}

export{signIn as UA_signIn}
export{sendData as UA_sendData}