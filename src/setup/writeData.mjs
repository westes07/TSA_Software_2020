import {createRequire} from 'module'
const require = createRequire(import.meta.url)
const fs = require("fs")

function writeConfig(_path, _json){
    fs.writeFileSync(_path, JSON.stringify(_json));
    console.log("Data written to " + _path + " successfully");
}



export {
    writeConfig as s_writeConfig,
}