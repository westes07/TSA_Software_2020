import {UA_getSessionID, UA_getUserName} from "./userAccount.js"

async function getCurrentEmployees(){


    fetch("http://localhost:8081/emp/getEmployees",{
        method: "POST",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mode: "list",
            empID: "",
            userName: UA_getUserName(),
            sessionID: UA_getSessionID(),

        })
    }).then(res => res.json())
    .then(data => {loadEmployeeList(data)})
    .catch(err => console.log(err))



}


function createNewEmployee(){
    //make sure you hash the password before sending it over
}

function loadEmployeeList(_employeeList){
    let sideBar = document.getElementById("em_sideBar");
    for(let i = 0; i < sideBar.children.length; i++){
        if(sideBar.children[i].classList.contains("em_nonDefault")){
            sideBar.removeChild(sideBar.children[i]);
        }
    }

    console.log(_employeeList);
    if(_employeeList.status !== "VALID"){
        alert(_employeeList.status);
    }

    for(let i = 0; i < _employeeList.empList.length; i++){
        let newButton = document.createElement("div");
        newButton.innerHTML = _employeeList.empList[i].EMP_FIRST;
        newButton.classList.add("app_button_frame");
        newButton.classList.add("em_button");
        newButton.classList.add("em_nonDefault");
        newButton.addEventListener("click", e=> {e.preventDefault(); 
            newButton.classList.add("em_button_active");
            loadEditor(_employeeList.empList[i].EMP_ID);});
        sideBar.appendChild(newButton);
    }


}

async function loadEditor(_empId){
    closeEditor();

    console.log(_empId);
    document.getElementById("em_editor").classList.remove("app_hidden");
    if(_empId !== "new"){
        let empData = await fetch("http://localhost:8081/emp/getEmployees", {
            method: "POST",
            headers:{
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                mode: "single",
                empID: _empId,
                userName: UA_getUserName(),
                sessionID: UA_getSessionID(),
            })
        });
        empData = await empData.json();
        // console.log(empData.empData.employee_data);
        empData = empData.empData.employee_data;

        document.getElementById("em_employeeFirstName").value = empData.EMP_FIRST;
        document.getElementById("em_employeeLastName").value = empData.EMP_LAST;
        document.getElementById("em_employeeId").value = empData.EMP_ID;
        document.getElementById("em_hourly").value = empData.EMP_WAGE;

    }

}

function commitChanges(){
    //def gonna want to add password protection to this function
    const isNewEmp = document.getElementById("em_createNewEmployee").classList.contains("em_button_active");
    const empId = document.getElementById("em_employeeId").value;
    const empFirst = document.getElementById("em_employeeFirstName").value;
    const empLast = document.getElementById("em_employeeLastName").value;
    const empWage = document.getElementById("em_hourly").value;

    fetch("http://localhost:8081/emp/setEmployees", {
        method: "POST",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mode: isNewEmp ? "new" : "update",
            empID: empId,
            userName: UA_getUserName(),
            sessionID: UA_getSessionID(),
            data: {
                EMP_ID: empId,
                EMP_LAST: empLast,
                EMP_FIRST: empFirst,
                EMP_SALARY: 0,
                EMP_WAGE: empWage,
                EMP_YTD: 0.00
            }
            
        })
    })
}

function closeEditor(){
    let editor = document.getElementById("em_editor");
    for(let i = 0; i < editor.children.length; i++){//clear current from
        if(editor.children[i].tagName === "DIV"){
            let subsect = editor.children[i];
            for(let j = 0; j < subsect.children.length; j++){
                if(subsect.children[j].tagName === "INPUT"){
                    subsect.children[j].value = "";
                }
            }
        }

    }

    let sidebar = document.getElementById("em_sideBar");
    for(let i = 0; i < sidebar.children.length; i++){
        if(sidebar.children[i].classList.contains("em_button_active")){
            sidebar.children[i].classList.remove("em_button_active");
        }
    }

    document.getElementById("em_editor").classList.add("app_hidden");
    getCurrentEmployees();

}

function override(_overrideType){
    
}


function linkToDom(){
    document.getElementById("em_createNewEmployee").addEventListener("click", e => {
        e.preventDefault(); 
        document.getElementById("em_createNewEmployee").classList.add("em_button_active");
        loadEditor("new");
    });

    document.getElementById("em_commitChanges").addEventListener("click", e => {e.preventDefault(); commitChanges();});
    document.getElementById("em_closeEmployeeRecord").addEventListener("click", e => {e.preventDefault(); closeEditor();});
    document.getElementById("em_overrideHours").addEventListener("click", e => {e.preventDefault(); override("hours");});

}


export{
    getCurrentEmployees as EM_getEmployeeList,
    linkToDom as EM_linkToDom
}