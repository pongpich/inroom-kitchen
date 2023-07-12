//! LOCALHOST */
const Config = "http://localhost/inroom-kitchen/src/Database/";

//! CMR */
// const Config = "http://10.150.212.185/PatientIn-Room/PatientIn-Room/Database/";

//! RAM PRODUCTION */
// const Config = "http://10.100.212.182/PatientIn-Room/PatientIn-Room/Database/";

//! RAM TEST */
// const Config = "http://10.100.196.185/PatientIn-Room/PatientIn-Room/Database/";


//? -------------------------- ?//
//?            RAM             ?//
//? -------------------------- ?//

export const ALL_ORDER_CALL_RAM = {
    ALL_ORDER_CALL : Config+"RAM/All-status-call/All-status-call.php",
    ALL_ORDER_R : Config+"RAM/All-status-call/All-status-R.php",
    ALL_ORDER_CALL_DETAIL : Config+"RAM/All-status-call/All-status-call-detail.php",
    ALL_ORDER_CALL_DETAIL_R : Config+"RAM/All-status-call/All-status-call-detail-R.php",
    COUNT_ORDER_CALL : Config+"RAM/All-status-call/Count-all-status-call.php",
    UPDATE_STATUS_CALL : Config+"RAM/All-status-call/Update/Update-status-call.php",
    COUNT_ORDER_BY_BILL : Config+"RAM/All-status-call/Count-order-by-bill.php"
}

export const ALL_ORDER_PROCESS_RAM = {
    ALL_ORDER_PROCESS : Config+"RAM/All-status-process/All-status-process.php",
    ALL_ORDER_PROCESS_DETAIL : Config+"RAM/All-status-process/All-status-process-detail.php",
    COUNT_ORDER_PROCESS : Config+"RAM/All-status-process/Count-all-status-process.php",
    UPDATE_STATUS_PROCESS : Config+"RAM/All-status-process/Update/Update-status-process.php",
    UPDATE_STATUS_TO_CALL : Config+"RAM/All-status-process/Update/Update-status-to-call.php"
}

export const ALL_ORDER_COMPLETED_RAM = {
    ALL_ORDER_COMPLETED : Config+"RAM/All-status-completed/All-status-completed.php",
    TYPE_BILL : Config+"RAM/All-status-completed/Type-bill.php",
    ALL_ORDER_COMPLETED_DETAIL : Config+"RAM/All-status-completed/All-status-completed-detail.php",
    COUNT_ORDER_COMPLETED : Config+"RAM/All-status-completed/Count-all-status-completed.php",
    UPDATE_STATUS_COMPLETED : Config+"RAM/All-status-completed/Update/Update-status-completed.php",
    COUNT_ORDER_BY_BILL : Config+"RAM/All-status-completed/Count-order-by-bill.php",
    UPDATE_STATUS_TO_PROCESS : Config+"RAM/All-status-completed/Update/Update-status-to-process.php",
    AMOUNT : Config+"RAM/All-status-completed/Amount.php"
}

export const SCAN = {
    ORDER_DETAIL : Config+"RAM/Scan/Scan-detail.php",
    UPDATE_ORDER_SCAN : Config+"RAM/Scan/Update/Update-scan.php"
}

export const KITCHEN_LOGIN = {
    KITCHEN_LOGIN : Config+"RAM/Kitchen-login/Kitchen-login.php"
}

export const REPORT_RAM = {
    ALL_REPORT : Config+"RAM/Report/Report-all.php",
    REPORT_DETAIL : Config+"RAM/Report/All-report-detail.php",
    AMOUNT : Config+"RAM/Report/Amount.php",
    AMOUNT_BILL : Config+"RAM/Report/Amount-bill.php",
}

export const REPORT_RAM_TYPE = {
    ALL_REPORT : Config+"RAM/Report/Report-type/Report-all.php",
    REPORT_DETAIL : Config+"RAM/Report/Report-type/All-report-detail.php",
    AMOUNT : Config+"RAM/Report/Report-type/Amount.php",
    AMOUNT_BILL : Config+"RAM/Report/Report-type/Amount-bill.php",
}

//! -------------------------- !//
//!            CMR             !//
//! -------------------------- !//

export const ALL_ORDER_CALL = {
    ALL_ORDER_CALL : Config+"CMR/All-status-call/All-status-call.php",
    ALL_ORDER_GENERAL_CALL : Config+"CMR/All-status-call/All-status-general-call.php",
    ALL_ORDER_DAILY_CALL : Config+"CMR/All-status-call/All-status-daily-call.php",
    COUNT_ORDER_CALL : Config+"CMR/All-status-call/Count-all-status-call.php",
    COUNT_GENERAL_CALL : Config+"CMR/All-status-call/Count-general-status-call.php",
    COUNT_DAILY_CALL : Config+"CMR/All-status-call/Count-daily-status-call.php",
    UPDATE_STATUS_CALL : Config+"CMR/All-status-call/Update/Update-status-call.php",
    ORDER_MORNING : Config+"CMR/All-status-call/Order-time-select/Order-time-select-morning.php",
    ORDER_NOON : Config+"CMR/All-status-call/Order-time-select/Order-time-select-noon.php",
    ORDER_EVENING : Config+"CMR/All-status-call/Order-time-select/Order-time-select-evening.php",
}

export const ALL_ORDER_PROCESS = {
    ALL_ORDER_PROCESS : Config+"CMR/All-status-process/All-status-process.php",
    COUNT_ORDER_PROCESS : Config+"CMR/All-status-process/Count-all-status-process.php",
    UPDATE_STATUS_PROCESS : Config+"CMR/All-status-process/Update/Update-status-process.php"
}

export const ALL_ORDER_COMPLETED = {
    ALL_ORDER_COMPLETED : Config+"CMR/All-status-completed/All-status-completed.php",
    COUNT_ORDER_COMPLETED : Config+"CMR/All-status-completed/Count-all-status-completed.php",
    UPDATE_STATUS_COMPLETED : Config+"CMR/All-status-completed/Update/Update-status-completed.php"
}