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
            
        })
    }).then(res => res.json())
    .then(data => {loadEmployeeList(data)})
    .catch(err => console.log(err))



}


function createNewEmployee(){

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
        newButton.addEventListener("click", e=> {e.preventDefault(); loadEditor(_employeeList.empList[i].EMP_ID);});
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
        if(editor.children[i].classList.contains("em_button_active")){
            editor.children[i].classList.remove("em_button_active");
        }
    }

    document.getElementById("em_editor").classList.add("app_hidden");
    getCurrentEmployees();

}

function override(_overrideType){
    
}

function addEmployee(employeeRecord){

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