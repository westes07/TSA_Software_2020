import {db_getEmployeeInfo} from "../../database/DBM_api.mjs"



async function getEmployee(req, res){

    const data = req.body;
    console.log(req.body);

    if(data.mode === "list"){
        const result = await db_getEmployeeInfo("list", "");
        if (result === "No Employees Exist"){
            res.send({status: result, empList: []})
            return;
        }
        res.send({status:"VALID", empList: result});
        return;

    }
    if(data.mode === "single"){
        const result = await db_getEmployeeInfo("single", data.empID);
        if(result === "Employee does not Exist"){
            res.send({status: result});
            return;
        }

        res.send({status: "VALID", empData: result});
        return;
    }
    res.send({status:"invalid mode"});

}


async function setEmployees(req, res){

}



export{
    getEmployee as fm_getEmployees,
    setEmployees as fm_setEmployees
}