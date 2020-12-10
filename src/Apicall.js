import React, {useState, useEffect} from 'react';
import {Row, Col, Card, Form, Input, Button,message,Popconfirm} from 'antd';
import Table from "antd/lib/table";
import axios from 'axios';
import {UserOutlined} from "@ant-design/icons";


let editedId = null;
const ApiCall = () => {
    const [userDetail, setUserDetail] = useState({
        id: "",
        name: "",
        salary: "",
        age: ""
    });
    const [data, setData] = useState([]);
    useEffect(() => {
        listDelete();
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUserDetail({...userDetail, [name]: value})
    }

    const onSubmit = () => {
        if (editedId !== null) {
            axios.put(`http://localhost:8080/notes/${editedId}`, userDetail).then(response => console.log(response));
        } else {
            userDetail.id = data.length + 1;
            axios.post('http://localhost:8080/notes',{...userDetail}).then(response =>{

            })
        }
        setUserDetail({})
    }

        const listDelete = () => {
            axios.get(`http://localhost:8080/notes`).then(response => setData(response.data || [])).catch(error => console.log(error));

        }
        const onDelete = (record) => {
            axios.delete(`http://localhost:8080/notes/${record}`).then(response => {
                listDelete();
                message.success("successfully deleted")
            }).catch(error => console.log(error));
        }
        const onEdit = (id) => {
            editedId = id;
            const findIndex = data.find(record => record._id === (id));
            setUserDetail(findIndex)
            listDelete();

        }


        const columns = [
            {
                title: "name",
                dataIndex: "name",
                key: "name",
            },
            {
                title: "salary",
                dataIndex: "salary",
                key: "salary",
            },
            {
                title: "age",
                dataIndex: "age",
                key: "age",
            },
            {
                title: 'Action',
                render: (text, record) => (
                    <div>
                        <button className="btn btn-outline-primary btn-mini" onClick={() => {
                            onEdit(record._id)
                        }}>
                            Edit
                        </button>
                        &nbsp; &nbsp;

                        <Popconfirm placement="rightTop"  onConfirm={() => {
                            onDelete(record._id)
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
                    <Col span={8}/>
                    <Col span={8}>
                        <Card>
                            <h2 style={{textAlign: "center"}}>Registration Form</h2>
                            <p style={{textAlign: "center"}}>Creat Your Account</p><br/>
                            <Form>
                                <Form.Item>
                                    <Input placeholder="Enter Your firstname" name="name"
                                           value={userDetail.name}
                                           onChange={handleChange} addonBefore={(<UserOutlined/>)}/>

                                </Form.Item>

                                <Form.Item>
                                    <Input placeholder="Enter Your salary" name="salary"
                                           value={userDetail.salary}
                                           onChange={handleChange} addonBefore={(<UserOutlined/>)}/>

                                </Form.Item>

                                <Form.Item>
                                    Age <Input placeholder="Enter Your age" name="age"
                                               value={userDetail.age}
                                               onChange={handleChange}/>

                                </Form.Item>

                                <Form.Item>
                                    <Button className="btn-create-account" Type="submit" onClick={onSubmit}>
                                        Create Account
                                    </Button>
                                </Form.Item>
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
                            dataSource={data || []}
                            pagination={{pageSize: 5}}
                        />


                    </Col>

                </Row>
            </>
        );

}

    export default ApiCall;