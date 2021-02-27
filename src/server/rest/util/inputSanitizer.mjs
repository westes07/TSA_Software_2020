function sanitizeUsernames(_str){
    let sanitizedStr = _str;
    if(_str.match(/[a-z][0-9]/)){
        sanitizedStr = "DLC";
    }
    return sanitizedStr;
}

function sanitizeEmployeeId(_str){
    let sanitizedStr = _str;
    if(_str.match(/[0-9]/)){
        sanitizedStr = "DLC";
    }
    return sanitizedStr;
}
export {sanitizeEmployeeId as ul_sanitizeEmployeeId};
export {sanitizeUsernames as ul_sanitizeUsernames};