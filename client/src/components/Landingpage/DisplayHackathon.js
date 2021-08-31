import React, { useState } from "react";
import { Input, Modal, Button, Select, notification } from "antd";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { __getCookie } from "../../utils/cookie.util";
import { useHistory} from "react-router-dom";
import { FP_COOKIE_PREFIX, G_API_URL } from "../../constants/constants";
import {check_login} from '../../utils/login.util'
import Card from './HackCard'

export default function DisplayHackathon({hackathons}) {

    console.log("props",hackathons)

    const renderHackathon = ()=>{
        return (hackathons.map(hackathon=>{
            return (<Card hackathon={hackathon}/>)
        }))
    }
    return (
        <>
            <div className="display-hackathon-container lr-pad-d lr-pad-m tb-pad-d-2">
                <div className="g-d g-col-3 g-gap-16 g-h-c">{renderHackathon()}</div>
            </div>
            
            <style jsx>
                {`
                    .display-hackathon-container{

                    }
                `}
            </style>
        </>
    )
}
