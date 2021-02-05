

function initializeUi(_resJson){
    document.getElementById("userInfo_firstName").innerText = _resJson.firstName;
    document.getElementById("userInfo_position").innerText = _resJson.position;
    document.getElementById("nav_companyName").innerText = "Real Company LLC";



}

function processRules(_rules){

}




export {initializeUi as UI_initializeUi}