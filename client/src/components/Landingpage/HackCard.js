import React from 'react'
import { Card } from "antd"; 
import {LikeOutlined} from '@ant-design/icons'

const { Meta } = Card;

export default function HackCard({hackathon}) {
    const liked = ()=>{

    }
    return (
        <>
            <div className="hackathon-card-container">
            <Card
                className="hackathon-card"
                style={{ width: 300 }}
                actions={[
                    
                ]}
            >
                <div className="meta">{hackathon.title}</div>
                <div className="desc"> {hackathon.description}</div>
                <div className="like f-d  f-h-sb">
                    <div className=""> <LikeOutlined  key="like" onClick = {()=>liked()}/></div>
                    <div className=""> {hackathon.likes.length}</div>
                </div>
            </Card>
            </div>
            <style jsx>
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
                        min-height:300px;
                        position:relative;
                    }

                    .like{
                        margin:2rem 0 ;
                        font-size:25px;
                        color: var(--bluemoon);
                        position: absolute;
                        bottom: 0;
                        width:80%;
                    }
                `}
            </style> 
        </>
    )
}
