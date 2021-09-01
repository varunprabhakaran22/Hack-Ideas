import React, { useState, useContext } from "react";
import { Input, Modal, Button, Select } from "antd";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { __getCookie } from "../../utils/cookie.util";
import { useHistory} from "react-router-dom";
import { FP_COOKIE_PREFIX, G_API_URL } from "../../constants/constants";
import {HackathonContext} from "../../context/HackathonContext"
import { openSuccessNotification, openFailureNotification } from "../../utils/notification";

const { TextArea } = Input;
const { Option } = Select;

export default function CreateHackathon() {
    const [visible, setVisible] = useState(false);
    const [title, setTitle] = useState();
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState("Application Development");
    const [explanation, setExplanation] = useState("");
    const history = useHistory();

    const {isLogin} = useContext(HackathonContext)
    const {fetchHackathons} = useContext(HackathonContext)

    //Re-direct to login 
    const openModal = ()=>{
        setVisible(!visible)
        if(!isLogin){
            history.push(`/login`);
        }
    }
    
    /*
        method to pass the the newly created values in API
        Only the logged in user can create the hackathons else redirect to login
    */
    const createHackathon = async () => {
        let token;
        let name

        if(!isLogin){
            history.push(`/login`);
        }
        
        if(isLogin){
            token = __getCookie(FP_COOKIE_PREFIX).cookieValue;
            let decodeToken = jwtDecode(token);
            name = decodeToken.name
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
            likes:[],
            createdAt: Math.floor(Date.now() / 1000),
            creator: name,
        };

        await axios.post(G_API_URL + "hackathon/create", data, config)
        .then(res =>{
            if(res.data.status === 1){
                setVisible(false)
                openSuccessNotification("created successfully");
                fetchHackathons()
            }
        }).catch(err =>{
            setVisible(false)
            openFailureNotification("Error! try after some times")
        })
    };
    
    //Modal along with form to capture the new hackathon details
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

    //enable create hackathon button only if inputs are valid
    let disabled = true;
    if (title !== "" && description !== "" && explanation !== "") disabled = false;
    return (
        <>
            <div className="create-hackathon-container lr-pad-d lr-pad-m tb-pad-d-2">
                <div className="f-d f-h-sb">
                    <Button onClick={() => openModal()}>Create Hackathons</Button>
                </div>
                <Modal title="Create Hackathon" visible={visible} onCancel={() => setVisible(!visible)} footer={null}>
                    {renderModal()}
                </Modal>
            </div>

            <style jsx>{`
                .create-hackathon-container {
                }

                .sort-by-likes{
                    margin-right:2rem;
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
