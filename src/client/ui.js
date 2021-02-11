import {TC_linkToDom} from "./timeclock.js";

function initializeUi(_resJson){
    document.getElementById("userInfo_firstName").innerText = _resJson.firstName;
    document.getElementById("userInfo_position").innerText = _resJson.position;
    document.getElementById("nav_companyName").innerText = "Real Company LLC";
    processRules(_resJson.rules);


}

function processRules(_rules){
    if(_rules.allowedPages.overview_allowed){
        document.getElementById("side_dashBoard_button").classList.remove("feature_disabled");
        //link function
    }
    if(_rules.allowedPages.time_clock_allowed){
        document.getElementById("side_timeClock_button").classList.remove("feature_disabled");
        document.getElementById("main_timeClock_body").classList.remove("feature_disabled");
        TC_linkToDom();
    }
    if(_rules.allowedPages.employee_manager_allowed){
        document.getElementById("side_employeeManager_button").classList.remove("feature_disabled");
        //link function
    }
}




export {initializeUi as UI_initializeUi}