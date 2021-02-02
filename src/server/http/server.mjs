import { createRequire } from 'module'
const require = createRequire(import.meta.url);
const express = require("express");
const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");
const port = 8080;

let app = express();

// Changes the file extensions to HTML recognisable content types
const mimeMap = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.mjs':'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.zip': 'application/zip',
    '.doc': 'application/msword',
    '.eot': 'application/vnd.ms-fontobject',
    '.ttf': 'application/x-font-ttf'
};

function startHttpServer(contentRoot) {
    http.createServer(function(req,res){
        const reqUrl = url.parse(req.url);
        const sanitisedUrl = path.normalize(reqUrl.pathname).replace(/^(\.\.[\/\\])+/, '');
        let urlPath = path.join(contentRoot, sanitisedUrl);

        //check if file exists
        if(!fs.existsSync(urlPath)){
            console.log("ERROR: file {} does not exist", urlPath);
            //todo add 404 path
            return;
        }

        //check if is directory
        if(fs.statSync(urlPath).isDirectory()){
            urlPath += "index.html";
        }

        fs.readFile(urlPath, function(err, data){
            if(err){
                res.statusCode = 500;
                //todo add 500 path
                res.end("ERROR: ${err} occured while getting files");
            }
            else{
                const ext = path.parse(urlPath).ext;
                res.setHeader('Content-type', mimeMap[ext] || 'text/plain');
                res.end(data);
            }
        })


    }).listen(port);
    console.log("INFO: Server is serving files from ", contentRoot, " on port ", port);

    

}


let test_get_func = function(req, res) {
    res.end("TEST");
};

let functionMap = new Map();
functionMap.set("test_get_func", test_get_func);

// var server;

function startRestServer(configJSON){
    for(let i = 0; i < configJSON.get_num; i++){
        app.get(configJSON.get_data[i].command, functionMap.get(configJSON.get_data[i].function_id));
    }

    var server = app.listen(8081, function () {
        let host = server.address().address;
        let port = server.address().port;
        console.log("Rest Server is now listenting");
    });
    
}

export {startHttpServer as ex_startHttpServer};
export {startRestServer as ex_startRestServer};