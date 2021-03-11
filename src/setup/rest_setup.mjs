import functionMap from "../server/rest/functionMap.mjs"


function getFunctionList() {
    return Array.from(functionMap.keys());
}


function generateRestData(_functionsToEnable){
    let rest_server = {
        get_data: [],
        post_data: []
    }
    let functions = [..._functionsToEnable];//oml js copies by ref unless you do this.

    const length = _functionsToEnable.length;
    // console.log(_functionsToEnable);
    for(let i = 0; i < length; i++){
        // console.log(_functionsToEnable[i]);
        functions[i] = functions[i].replace(/_/g, "/");
        functions[i] = functions[i].slice(0, functions[i].indexOf("/func"));
        functions[i] = "/" + functions[i];
    }

    for(let i = 0; i < length; i++){
        if(functions[i].includes("store")){
            functions[i] = "/system" + functions[i];
            let getData = {
                command: functions[i],
                function_id: _functionsToEnable[i]
            }
            rest_server.get_data.push(getData);
        } else {
            let postData = {
                command: functions[i],
                function_id: _functionsToEnable[i]
            }
            rest_server.post_data.push(postData);
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