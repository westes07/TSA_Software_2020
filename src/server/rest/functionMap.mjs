import {fm_auth_manager, fm_generate_session_ID} from "./auth/auth.mjs";
import {fm_timeclock_punch, fm_timeclockCurrent} from "./timeclock/timeclock.mjs"
import {fm_getEmployees, fm_setEmployees} from "./emp/empManager.mjs"
import {fm_systemStoreInfo, fm_systemStoreBranding} from "./util/system.mjs"

let functionMap = new Map();

functionMap.set("auth_manager_func", fm_auth_manager);
functionMap.set("timeclock_punch_func", fm_timeclock_punch)
functionMap.set("timeclock_current_func", fm_timeclockCurrent)
functionMap.set("generate_session_ID_func", fm_generate_session_ID);
functionMap.set("emp_getEmployees_func", fm_getEmployees);
functionMap.set("emp_setEmployees_func", fm_setEmployees);
functionMap.set("store_info_func", fm_systemStoreInfo);
functionMap.set("store_branding_func", fm_systemStoreBranding)


export {functionMap as default}