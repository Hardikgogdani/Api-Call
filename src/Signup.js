import React, {useState} from "react";
import {Row, Col, Card, Form, Input, Button,message} from "antd";
import {UserOutlined} from "@ant-design/icons";
import 'antd/dist/antd.css';
import {useHistory} from "react-router";
import axios from "axios";

const Signup = (props) => {
    const history = useHistory();
    const [empList, setEmpList] = useState([]);
    const [userDetail, setUserDetail] = useState({
        id:"",
        employee_name:"",
        employee_salary:"",
        employee_age:""
    });
    const [data, setData] = useState([]);


    const handleChange = (e) => {
        const {name, value} = e.target;
        setUserDetail({...userDetail, [name]: value})
    }

    const  onSubmit=()=>{

        axios.post('http://dummy.restapiexample.com/api/v1/create/').then(response => {message.success(response.data.message)});
        history.push('/user');
    }

    return (
        <>
            <Row style={{marginTop: 100}}>
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


                            <Form.Item>
                                <Button  className="btn-create-account" Type="submit" onClick={onSubmit}>
                                    Create Account
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
                <Col span={8}/>
            </Row>
        </>
    )
}
export default Signup;