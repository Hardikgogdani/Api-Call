import React, {useState,useEffect} from 'react';
import {Row, Col, Popconfirm,message} from 'antd';
import Table from "antd/lib/table";
import axios from 'axios';

const ApiCall = () => {
    const text1 = 'Are you sure to Delete this task?';

    // const [data,setData] = useState([]);
    const [empList,setEmpList] =useState([]);

    useEffect(()=>{
        listDelete();
    })

    const listDelete =()=>{
        axios.get(`http://dummy.restapiexample.com/api/v1/employees`).then(response => setEmpList(response.data.data || [])).catch(error => console.log(error));

    }
 const onDelete = (record) =>{

     axios.delete(`http://dummy.restapiexample.com/api/v1/delete/ ${record}`).then(response => {message.success(response.data.status)}).catch(error => console.log(error));
     listDelete();
 }
 const onEdit = (record) =>{
        axios.put(`\thttp://dummy.restapiexample.com/api/v1/update/${record}`).then(response => {
            message.success(response.data.status)
        });
        listDelete();
 }
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
        },
        {
            title: 'Action',
            render: (text, record) => (
                <div>
                    <button className="btn btn-outline-primary btn-mini" onClick={() => {
                        onEdit(record)
                    }}>
                        Edit
                    </button>
                    &nbsp; &nbsp;

                    <Popconfirm placement="rightTop" title={text1} onConfirm={() => {
                        onDelete(record)
                    }} okText="Yes" cancelText="No">
                        <button className="btn btn-outline-danger btn-mini">
                            Delete
                        </button>
                    </Popconfirm>
                </div>
            )
        },
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