import {createRequire} from "module"
const require = createRequire(import.meta.url)
const fs = require("fs") 

//this file will be responsiable for loading branding and config info.
//basically loads a special config file and sends it 


let storeInfo = {};

function readStoreInfo(_path) {

}


function getStoreInfo (req, res){

}

function getStoreBranding(req, res){

}


export {
    getStoreInfo as fm_systemStoreInfo,
    getStoreBranding as fm_systemStoreBranding
}