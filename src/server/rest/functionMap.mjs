import {fm_auth_manager, fm_generate_session_ID} from "./auth/auth.mjs";
import {fm_timeclock_punch, fm_timeclockCurrent} from "./timeclock/timeclock.mjs"


let functionMap = new Map();

functionMap.set("auth_manager_func", fm_auth_manager);
functionMap.set("timeclock_punch_func", fm_timeclock_punch)
functionMap.set("timeclock_current_func", fm_timeclockCurrent)
functionMap.set("generate_session_ID_func", fm_generate_session_ID);


export {functionMap as default}