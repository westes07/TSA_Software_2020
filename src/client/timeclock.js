function startShift(e){

}

function endShift(e){

}

function startLunch(e){

}

function endLunch(e){

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
    let hours = cur.getHours().toString();
    hours = hours.length === 1 ? 0+hours : hours;
    let minutes = cur.getMinutes().toString();
    minutes = minutes.length === 1 ? 0+minutes : minutes;
    let secs = cur.getSeconds().toString();
    secs = secs.length === 1 ? 0+secs : secs;
    const time = hours + ':' + minutes + ':' + secs;

    document.getElementById("tc_currentTime").innerText = time;

    setTimeout(currentTime, 1000);

}
currentTime();

function linkToDom(){
    document.getElementById("tc_shiftStart_button").addEventListener("click", startShift);
    document.getElementById("tc_shiftEnd_button").addEventListener("click", endShift);
    document.getElementById("tc_lunchStart_button").addEventListener("click", startLunch);
    document.getElementById("tc_lunchEnd_button").addEventListener("click", endLunch);

}

export {linkToDom as TC_linkToDom}