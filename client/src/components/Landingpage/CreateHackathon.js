import React, { useState } from "react";
import { Input, Modal, Button, Select, notification } from "antd";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { __getCookie } from "../../utils/cookie.util";
import { useHistory} from "react-router-dom";
import { FP_COOKIE_PREFIX, G_API_URL } from "../../constants/constants";
import {check_login} from '../../utils/login.util'

const { TextArea } = Input;
const { Option } = Select;

export default function CreateHackathon() {
    const [visible, setVisible] = useState(false);
    const [title, setTitle] = useState();
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState("Application Development");
    const [explanation, setExplanation] = useState("");
    const history = useHistory();


    const createHackathon = async () => {
        console.log("Title", title, "  description ", description, "   tags", tags, "  explanation", explanation);
        let token;
        let name
        if(!check_login()){
            history.push(`/login`);
        }
        if(check_login()){
            token = __getCookie(FP_COOKIE_PREFIX).cookieValue;
            let decodeToken = jwtDecode(token);
            console.log(token);
            name = decodeToken.name
            console.log(name);
        }
        
        let config = {
            headers: {
                Authorization: token,
            },
        };
        let data = {
            title,
            description,
            explanation,
            tags,
            createdAt: Math.floor(Date.now() / 1000),
            creator: name,
        };

        await axios.post(G_API_URL + "hackathon/create", data, config)
        .then(res =>{
            if(res.status === 1){
                setVisible(false)
                openSuccessNotification("created successfully");
            }
        }).catch(err =>{
            setVisible(false)
            openFailureNotification("Error! try after some times")
        })
    };

    const openSuccessNotification = msg => {
        const args = {
            message: msg,
            description: "",
            top: 54,
            className: "success-notification-top",
        };
        notification.open(args);
    };

    const openFailureNotification = msg => {
        const args = {
            message: msg,
            description: "",
            top: 54,
            className: "failure-notification-top",
        };
        notification.open(args);
    };

    const renderModal = () => {
        return (
            <>
                <Input className="input-box" placeholder="Title" onChange={e => setTitle(e.target.value)} />
                <Input className="input-box" placeholder="Description" onChange={e => setDescription(e.target.value)} />
                <Select defaultValue="Application Development" style={{ width: 220 }} onChange={e => setTags(e.value)}>
                    <Option value="app">Application Development</Option>
                    <Option value="features">Build Features</Option>
                    <Option value="ds/da">DS/DA</Option>
                    <Option value="devops">DevOps</Option>
                    <Option value="testing">Testing</Option>
                </Select>
                <TextArea rows={4} placeholder="Explanation" onChange={e => setExplanation(e.target.value)} />
                <Button onClick={() => createHackathon()} disabled={disabled}>
                    Create
                </Button>
            </>
        );
    };
    let disabled = true;
    if (title !== "" && description !== "" && explanation !== "") disabled = false;
    return (
        <>
            <div className="create-hackathon-container lr-pad-d lr-pad-m tb-pad-d-2">
                <Button onClick={() => setVisible(!visible)}>Create Hackathons</Button>
                <Modal title="Create Hackathon" visible={visible} onCancel={() => setVisible(!visible)} footer={null}>
                    {renderModal()}
                </Modal>
            </div>

            <style jsx>{`
                .create-hackathon-container {
                }

                .create-hackathon-container .ant-btn {
                    color: var(--facered) !important;
                    border: 1px solid var(--facered) !important;
                }
                .create-hackathon-container .ant-btn:hover {
                    color: var(--dove) !important;
                    background-color: var(--facered) !important;
                }

                .ant-input,
                .ant-select-selection {
                    width: 90% !important;
                    margin: 0.5rem 0 !important;
                    height: 45px;
                }
            `}</style>
        </>
    );
}
