function startShift(e){

}

function endShift(e){

}

function startLunch(e){

}

function endLunch(e){

}

function linkToDom(){
    document.getElementById("tc_shiftStart_button").addEventListener("click", startShift);
    document.getElementById("tc_shiftEnd_button").addEventListener("click", endShift);
    document.getElementById("tc_lunchStart_button").addEventListener("click", startLunch);
    document.getElementById("tc_lunchEnd_button").addEventListener("click", endLunch);

}

export {linkToDom as TC_linkToDom}