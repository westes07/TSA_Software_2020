import {createRequire} from 'module'
const require = createRequire(import.meta.url)
const fs = require("fs")

function writeConfig(_path, _json){
    fs.writeFileSync(_path, JSON.stringify(_json));
    console.log("Data written to " + _path + " successfully");
}

function setEnviromentalVars(_name, _data){
    console.log("This function is not currently implemented");

}





export {
    setEnviromentalVars as s_setEnviromentalVars,
    writeConfig as s_writeConfig,
}