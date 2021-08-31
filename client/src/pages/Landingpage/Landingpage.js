import React, { useState, useEffect } from "react";
import { Input, Modal, Button, Select, notification } from "antd";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { __getCookie } from "../../utils/cookie.util";
import { useHistory} from "react-router-dom";
import { FP_COOKIE_PREFIX, G_API_URL } from "../../constants/constants";
import {check_login} from '../../utils/login.util'
import Layout from "../../components/Layout";
import CreateHackathon from "../../components/Landingpage/CreateHackathon";
import Hackathons from "../../components/Landingpage/DisplayHackathon";
import HackathonContext from "../../context/HackathonContext"

export default function Landingpage() {
    const [hackathons, setHackathons] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        fetchHackathons()
    },[])

    const fetchHackathons = async() => {
        let hackathons 
        await axios.get(G_API_URL + "hackathon/")
        .then((res) =>{
            if(res.data.status ===1){
                console.log(res)
                hackathons = res.data.data
                setHackathons(hackathons)
                sort("likess", hackathons, "ascending")
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    const sort = (basedOn,hackathons,type)=>{
        let hackathons_data = hackathons
        console.log(hackathons_data)
        if(basedOn === "likes"){
            console.log("filter")
            if(type==="ascending")
                hackathons_data.sort((a,b)=> a.likes.length - b.likes.length)
            else
                hackathons_data.sort((a,b)=> b.likes.length - a.likes.length)
        }else{
            console.log("filter time")
            if(type==="ascending")
                hackathons_data.sort((a,b)=> a.createdAt - b.createdAt)
            else
                hackathons_data.sort((a,b)=> b.createdAt - a.createdAt)
        }
        console.log(hackathons_data)

        setHackathons(hackathons_data)
    }


    console.log("state",hackathons)
    return (
        <>
            <Layout>
                <CreateHackathon />
                <Hackathons hackathons={hackathons} />
            </Layout>
        </>
    );
}
