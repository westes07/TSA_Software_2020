import {UA_getSessionID, UA_getUserName} from "./userAccount.js";


function punch(_action){
    const empID = document.getElementById("tc_employee_id").value;
    if(empID.length === 0){
        document.getElementById("tc_statusBox").innerHTML = "Your Employee ID is required";
        document.getElementById("tc_statusBox").style.color = "#ff0000";
        setTimeout(() => {
            document.getElementById("tc_statusBox").innerHTML = "Enter your Employee ID and press the relevant punch";
            document.getElementById("tc_statusBox").style.color = "";
        }, 2500);
        return;
    }
    fetch("http://localhost:8081/timeclock/punch", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            empID:empID,
            userName: UA_getUserName(),
            sessionID: UA_getSessionID(),
            punchType: _action,
            punchTime: Date.now(),
        })
    }).then(res => res.json())
        .then(data => {logPunch(data)})
        .catch(err => console.log(err));
}

function getCurrentPunches(){
    const empID = document.getElementById("tc_employee_id").value;
    if(empID.length === 0){
        document.getElementById("tc_statusBox").innerHTML = "Your Employee ID is required";
        document.getElementById("tc_statusBox").style.color = "#ff0000";
        setTimeout(() => {
            document.getElementById("tc_statusBox").innerHTML = "Enter your Employee ID and press the relevant punch";
            document.getElementById("tc_statusBox").style.color = "";
        }, 2500);
        return;
    }

    fetch("http://localhost:8081/timeclock/currentPunches", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            empID: empID,
            userName: UA_getUserName(),
            sessionID: UA_getSessionID(),
        })
    }).then(res => res.json())
        .then(data => {logPunch(data)})
        .catch(err => console.log(err))
}

function logPunch(_data){
    console.log(_data);
    if(_data.status !== "VALID") {
        document.getElementById("tc_statusBox").innerHTML = !_data.status ? "A database error has occurred" : _data.status;
        document.getElementById("tc_statusBox").style.color = "#ff0000";
        setTimeout(() => {
            document.getElementById("tc_statusBox").innerHTML = "Enter your Employee ID and press the relevant punch";
            document.getElementById("tc_statusBox").style.color = "";
        }, 5000);

        return;
    }

    let punchLog = document.getElementById("tc_punchLog");
    punchLog.innerHTML = "";

    for(let i = 0; i < _data.punches.length; i++){
        let newEntry = document.createElement("div");
        newEntry.classList.add("tc_punchLog_element");
        newEntry.innerHTML = formatPunchType(_data.punches[i].punchType) + " " + getHoursMinutes(new Date(parseInt(_data.punches[i].punch)));
        if(i%2 === 0){
            newEntry.style.backgroundColor = "#ededed";
        }
        punchLog.appendChild(newEntry);
    }
    punchLog.scrollTop = punchLog.scrollHeight;

}


function getHoursMinutes(_time){
    let hours = _time.getHours().toString();
    hours = hours.length === 1 ? 0+hours : hours;
    let minutes = _time.getMinutes().toString();
    minutes = minutes.length === 1 ? 0+minutes : minutes;
    let secs = _time.getSeconds().toString();
    secs = secs.length === 1 ? 0+secs : secs;
    return hours + ':' + minutes + ':' + secs;
}

function formatPunchType(_punchTye){
    switch(_punchTye){
        case "shiftStart": return "Shift Started at ";
        case "shiftEnd"  : return "Shift Ended at ";
        case "lunchStart": return "Lunch Started at ";
        case "lunchEnd"  : return "Lunch Ended at ";
    }
}
function clear(){

}


function currentTime(){
    if(document.getElementById("main_timeClock_body").classList.contains("app_hidden")){
        setTimeout(currentTime, 100);
        return;
    }
    if(document.getElementById("main_timeClock_body").classList.contains("feature_disabled")){
        return;
    }
    const cur = new Date();
    //this gets the current time and formats it as hh:mm:ss
    document.getElementById("tc_currentTime").innerText = getHoursMinutes(cur);

    setTimeout(currentTime, 1000);

}
currentTime();

function linkToDom(){
    document.getElementById("tc_shiftStart_button").addEventListener("click", e => {e.preventDefault(); punch("shiftStart")});
    document.getElementById("tc_shiftEnd_button").addEventListener("click", e => {e.preventDefault(); punch("shiftEnd")});
    document.getElementById("tc_lunchStart_button").addEventListener("click", e => {e.preventDefault(); punch("lunchStart")});
    document.getElementById("tc_lunchEnd_button").addEventListener("click", e => {e.preventDefault(); punch("lunchEnd")});
    document.getElementById("tc_getPunchLog_button").addEventListener("click", e => {e.preventDefault(); getCurrentPunches()});

}

export {linkToDom as TC_linkToDom}