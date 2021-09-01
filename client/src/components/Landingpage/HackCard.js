
import React, { useContext } from "react";
import { Card } from "antd"; 
import {LikeOutlined} from '@ant-design/icons'
import jwtDecode from "jwt-decode";
import axios from "axios";
import {HackathonContext} from "../../context/HackathonContext"
import { __getCookie } from "../../utils/cookie.util";
import { useHistory} from "react-router-dom";
import { FP_COOKIE_PREFIX, G_API_URL } from "../../constants/constants";

// liked = #2d60ff


export default function HackCard({hackathon}) {

    const history = useHistory();
    
    const {fetchHackathons} = useContext(HackathonContext)
    const {isLogin} = useContext(HackathonContext)

    let liked = false
    let token;
    let email
    if(isLogin){
        token = __getCookie(FP_COOKIE_PREFIX).cookieValue;
        let decodeToken = jwtDecode(token);
        email = decodeToken.email
    }
    liked = hackathon.likes.includes(email)


    /*
        Method to check logic for like, unlike the hackathons
    */
    const handleLike = async()=>{
        if(!isLogin){
            history.push(`/login`);
        }else{
            let data = hackathon
            let config = {
                headers: {
                    Authorization: token,
                },
            };
            if(!liked)
                data.likes.push(email)
            else
                data.likes = data.likes.filter(email_id => email_id!==email)
            
            await axios.put(G_API_URL + "hackathon/update", data, config)
            .then(res =>{
                if(res.data.status === 1)
                    fetchHackathons()
            }).catch(err => console.error("error",err)) 
        }
    }

    return (
        <>
            <div className="hackathon-card-container">
            <Card
                className="hackathon-card"
                style={{ width: 350 }}
            >
                <div className="meta">Title: {hackathon.title}</div>
                <div className="desc">Description: {hackathon.description}</div>
                <h3 className="h3-heading">Created By: {hackathon.creator}</h3>
                <div className="like f-d  f-h-sb">
                    <div className={`${liked ? "liked"  : "not-liked"}`}> 
                        <LikeOutlined  key="like" onClick = {()=>handleLike()}/>
                    </div>
                    <div className=""> {hackathon.likes.length}</div>
                </div>
            </Card>
            </div>
            <style jsx={'true'}>
                {`  
                    .meta{
                        font-size:30px;
                        color: var(--carbon);   
                        font-weight:500;                 
                    }
                    .desc{
                        margin:1rem 0;
                        font-size:24px;
                    }
                    .hackathon-card{
                        min-height:400px;
                        position:relative;
                    }

                    .like{
                        margin-top:0.5rem ;
                        font-size:25px;
                        position: absolute;
                        bottom: 0;
                        width:80%;
                    }

                    .not-liked{
                        color: var(--sandstone);
                    }

                    .liked{
                        color: var(--bluemoon);
                    }
                `}
            </style> 
        </>
    )
}
