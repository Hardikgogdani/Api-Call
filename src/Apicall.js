import React, {useState,useEffect} from 'react';
import {Row, Col} from 'antd';
import Table from "antd/lib/table";
import axios from 'axios';

const ApiCall = () => {
    const [empList,setEmpList] =useState([{
        id:"",
        employee_name:"",
        employee_salary:"",
        employee_age:""
    }]);

    useEffect(()=>{
       axios.get(`http://dummy.restapiexample.com/api/v1/employees`).then(response => setEmpList(response.data.data || []));
    })
    const columns = [{
        title: "id",
        dataIndex: 'id',
        key: 'id',
    },
        {
            title: "employee_name",
            dataIndex: "employee_name",
            key: "employee_name",
        },
        {
            title: "employee_salary",
            dataIndex: "employee_salary",
            key: "employee_salary",
        },
        {
            title: "employee_age",
            dataIndex: "employee_age",
            key: "employee_age",
        }
    ];


return (
    <>
        <Row>
            <Col span={4}/>
            <Col span={16} className="mt-3">
                <Table
                        columns={columns}
                        dataSource={empList}
                        pagination={{pageSize: 5}}
                    />


            </Col>
        </Row>
    </>
);
}

export default ApiCall;