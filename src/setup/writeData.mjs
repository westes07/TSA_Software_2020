import {createRequire} from 'module'
const require = createRequire(import.meta.url)
const fs = require("fs")

function writeStoreConfig(path, _json){

}

function writeServerConfig(path, _json){

}

export {
    writeServerConfig as s_writeServerConfig,
    writeStoreConfig as s_writeStoreConfig
}