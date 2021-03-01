import {TC_linkToDom} from "./modules/timeclock.js";

function initializeUi(_resJson){
    document.getElementById("userInfo_firstName").innerText = _resJson.firstName;
    document.getElementById("userInfo_position").innerText = _resJson.position;
    document.getElementById("nav_companyName").innerText = "Real Company LLC";
    processRules(_resJson.rules);


}

function processRules(_rules){
    if(_rules.allowedPages.overview_allowed){
        document.getElementById("side_dashBoard_button").classList.remove("feature_disabled");
        document.getElementById("main_dashBoard_body").classList.remove("feature_disabled");

        document.getElementById("side_dashBoard_button").addEventListener('click',
        (e)=>{
                    showPage( document.getElementById("side_dashBoard_button"), document.getElementById("main_dashBoard_body"));
                });
        //link function
    }
    if(_rules.allowedPages.time_clock_allowed){
        document.getElementById("side_timeClock_button").classList.remove("feature_disabled");
        document.getElementById("main_timeClock_body").classList.remove("feature_disabled");
        document.getElementById("side_timeClock_button").addEventListener('click',
            (e)=>{
                showPage(document.getElementById("side_timeClock_button"), document.getElementById("main_timeClock_body"));
            });
        TC_linkToDom();
    }
    if(_rules.allowedPages.employee_manager_allowed){
        document.getElementById("side_employeeManager_button").classList.remove("feature_disabled");
        //link function
    }
}


function hideAll(){
    {
        let domElement = document.getElementById("main_content");
        for (let i = 0; i < domElement.childElementCount; i++) {
            if (!domElement.children[i].classList.contains("feature_disabled"))
                domElement.children[i].classList.add("app_hidden");
        }
    }
    {
        let domElement = document.getElementById("side_bar");
        for (let i = 0; i < domElement.childElementCount; i++) {
            if (!domElement.children[i].classList.contains("feature_disabled"))
                domElement.children[i].classList.remove("button_active");
        }
    }
}

function showPage(_buttonDomElement, _pageDomElement){
    hideAll();
    if(!_pageDomElement.classList.contains("feature_disabled"))
        _pageDomElement.classList.remove("app_hidden");
    if(!_buttonDomElement.classList.contains("feature_disabled"))
        _buttonDomElement.classList.add("button_active");

}




export {initializeUi as UI_initializeUi}