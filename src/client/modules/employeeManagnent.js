async function getCurrentEmployees(){




}


function createNewEmployees(){

}

function loadEmployeeList(_employeeList){

}

function loadEditor(_empId){
    document.getElementById("em_editor").classList.remove("app_hidden");


}

function commitChanges(){
    //def gonna want to add password protection to this function



}

function closeEditor(){
    let editor = document.getElementById("em_editor");
    for(let i = 0; i < editor.children.length; i++){//clear current from
        if(editor.children[i].tagName === "INPUT"){
            editor.children[i].value = "";
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