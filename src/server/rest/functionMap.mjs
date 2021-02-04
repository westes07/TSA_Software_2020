import {fm_auth_manager} from "./auth/auth.mjs";


let functionMap = new Map();

functionMap.set("auth_manager_func", fm_auth_manager);




export {functionMap as default}