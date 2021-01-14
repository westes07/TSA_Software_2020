import { createRequire } from 'module'
const require = createRequire(import.meta.url);
const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");
const port = [8080, 8081];

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

function startWebServer(contentRoot) {
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


    }).listen(port[0]);
    console.log("INFO: Server is serving files from ", contentRoot, " on port ", port[0]);

}

function startApiServer(contentRoot) {
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


    }).listen(port[1]);
    console.log("INFO: Server is serving files from ", contentRoot, " on port ", port[1]);

}

export {
    startWebServer as ex_startWebServer,
    startApiServer as ex_startApiServer
};