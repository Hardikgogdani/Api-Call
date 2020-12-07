import React,{useState} from 'react';
import axios from 'axios';

const Apicall = () => {
    const [empList, setEmpList] = useState({
        id:"",
        employee_name:"",
        employee_salary:"",
        employee_age:""
    })
    const onChange =() =>{

    }

    return (
        <div className="first-div">
            <h2>Employee Registration</h2>
            Employee-Name :<input type="text" name="empName" onChange={onChange}/><br />
            Employee-Salary :<input type="number" name="empSalary" onChange={onChange}/><br/>
            Employee-Age :<input type="text" name="empAge" onChange={onChange}/><br/>
            <button>Click</button>
        </div>
    );
}

export default Apicall;