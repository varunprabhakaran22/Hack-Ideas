import React, { useState, useEffect } from "react";
import axios from "axios";
import { G_API_URL } from "../../constants/constants";
import {check_login} from '../../utils/login.util'
import Layout from "../../components/Layout";
import CreateHackathon from "../../components/Landingpage/CreateHackathon";
import Hackathons from "../../components/Landingpage/DisplayHackathon";
import {HackathonContext} from "../../context/HackathonContext"
import Sorting from '../../components/Landingpage/Sorting'
import Spinner from "../../components/Spinner/Spinner"

export default function Landingpage() {
    const [hackathons, setHackathons] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLogin, setIsLogin] = useState(false);


    useEffect(() => { 
        fetchHackathons()
    },[])

    const fetchHackathons = async() => {
        // setIsLoading(true)
        let isLogin = check_login()
        let hackathons 
        await axios.get(G_API_URL + "hackathon/")
        .then((res) =>{
            if(res.data.status ===1){
                hackathons = res.data.data
                setIsLoading(false)
                setHackathons(hackathons)
                setIsLogin(isLogin)
            }
        }).catch((error) => {
            setIsLoading(false)
            setIsLogin(isLogin)
            console.log(error)
        })
    }
    
    return (
        <>
            <Layout>
                {!isLoading ?
                    <HackathonContext.Provider value={{hackathons, setHackathons, isLogin, fetchHackathons}} >
                        <CreateHackathon />
                        <Sorting />
                        <Hackathons />
                    </HackathonContext.Provider>
                : <Spinner />}
            </Layout>
            <style jsx={'true'}>{`
                .action-block {
                    margin: 0 0 var(--peaky-gap-32);
                }
            `}</style>
        </>
    );
}
