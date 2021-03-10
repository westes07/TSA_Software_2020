import functionMap from "../server/rest/functionMap.mjs"


function getFunctionList() {
    return Array.from(functionMap.keys());
}


function generateRestData(_functionsToEnable){
    let rest_server = {
        get_data: [],
        post_data: []
    }

    const length = _functionsToEnable.length;
    // console.log(_functionsToEnable);
    for(let i = 0; i < length; i++){
        // console.log(_functionsToEnable[i]);
        if(!_functionsToEnable[i]){
            break;
        }
        _functionsToEnable[i] = _functionsToEnable[i].replace(/_/g, "/");
        _functionsToEnable[i] = _functionsToEnable[i].slice(_functionsToEnable[i].indexOf("/func")-1, 5);
    }

    for(let i = 0; i < length; i++){
        if(!_functionsToEnable[i]){
            break;
        }
        if(_functionsToEnable[i].includes("store")){
            _functionsToEnable[i] = "/system" + _functionsToEnable[i];
            rest_server.get_data.push(_functionsToEnable[i]);
        } else {
            rest_server.post_data.push(_functionsToEnable[i]);
        }
    }

    rest_server.get_num = rest_server.get_data.length;
    rest_server.post_num =  rest_server.post_data.length;
    return rest_server;
}



export {
    getFunctionList as s_getFunctionList,
    generateRestData as s_generateRestData

}