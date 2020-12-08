import React, {useState, useEffect} from 'react';
import {Row, Col, Popconfirm, message, Card, Form, Input, Button} from 'antd';
import Table from "antd/lib/table";
import axios from 'axios';
import {UserOutlined} from "@ant-design/icons";

const ApiCall = () => {
    const text1 = 'Are you sure to Delete this task?';
    const [userDetail,setUserDetail] = useState({
        id:"",
        employee_name:"",
        employee_salary:"",
        employee_age:""
    });
    const [data,setData] = useState([]);
    useEffect(() => {
        listDelete();
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setData({...data, [name]: value})
    }
    //
    // const  onSubmit=()=>{
    //     axios.post('http://dummy.restapiexample.com/api/v1/create/').then(response => {message.success(response.data.message)});
    // }

    const listDelete = () => {
        axios.get(`http://dummy.restapiexample.com/api/v1/employees`).then(response => setData(response.data.data || [])).catch(error => console.log(error));

    }
    // const onDelete = (record) => {
    //     axios.remove(`http://dummy.restapiexample.com/api/v1/delete/ ${record}`).then(response => {
    //         message.success(response.data.status)
    //     }).catch(error => console.log(error));
    //     listDelete();
    // }
    const onEdit = (id) => {
        debugger
        const findIndex = data.find(record => record.id === (id));
        setUserDetail(findIndex)
        // axios.put(`http://dummy.restapiexample.com/api/v1/update/${record.id}`).then(response => {
        //     message.success(response.data.status)
        // });
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
                        onEdit(record.id)
                    }}>
                        Edit
                    </button>
                    &nbsp; &nbsp;

                    {/*<Popconfirm placement="rightTop" title={text1} onConfirm={() => {*/}
                    {/*    onDelete(record)*/}
                    {/*}} okText="Yes" cancelText="No">*/}
                    {/*    <button className="btn btn-outline-danger btn-mini">*/}
                    {/*        Delete*/}
                    {/*    </button>*/}
                    {/*</Popconfirm>*/}
                </div>
            )
        },
    ];


    return (
        <>
            <Row >
                <Col span={8}/>
                <Col span={8}>
                    <Card>
                        <h2 style={{textAlign: "center"}}>Registration Form</h2>
                        <p style={{textAlign: "center"}}>Creat Your Account</p><br/>
                        <Form>
                            <Form.Item>
                                <Input placeholder="Enter Your firstname" name="employee_name" value={userDetail.employee_name}
                                       onChange={handleChange} addonBefore={(<UserOutlined/>)}/>

                            </Form.Item>

                            <Form.Item>
                                <Input placeholder="Enter Your salary" name="employee_salary" value={userDetail.employee_salary}
                                       onChange={handleChange} addonBefore={(<UserOutlined/>)}/>

                            </Form.Item>

                            <Form.Item>
                                Age <Input placeholder="Enter Your age" name="employee_age" value={userDetail.employee_age}
                                           onChange={handleChange} />

                            </Form.Item>


                            {/*<Form.Item>*/}
                            {/*    <Button  className="btn-create-account" Type="submit" onClick={onSubmit}>*/}
                            {/*        Create Account*/}
                            {/*    </Button>*/}
                            {/*</Form.Item>*/}
                        </Form>
                    </Card>
                </Col>
                <Col span={8}/>
            </Row>
            <Row>

                <Col span={4}/>
                <Col span={16} className="mt-3">
                    <Table
                        columns={columns}
                        dataSource={data}
                        pagination={{pageSize: 5}}
                    />


                </Col>

            </Row>
        </>
    );
}

export default ApiCall;