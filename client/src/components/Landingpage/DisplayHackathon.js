import React, { useContext } from "react";
import Card from './HackCard'
import {HackathonContext} from "../../context/HackathonContext"

export default function DisplayHackathon() {

    const {hackathons} = useContext(HackathonContext)

    //Pass individual hackathons as props to hackcard component
    const renderHackathon = ()=>{
        return (hackathons.map(hackathon=>{
            return (<Card key = {hackathon.id} hackathon={hackathon}/>)
        }))
    }

    return (
        <>
            <div className="display-hackathon-container lr-pad-d lr-pad-m tb-pad-d-2">
                <h1 className="h1-heading"> Trending Hackathons </h1>
                <div className="g-d g-col-3 g-gap-32 g-h-c">{renderHackathon()}</div>
            </div>
            
            <style jsx={'true'}>
                {`
                    .display-hackathon-container{
                        // background-color: var(--snowfall);
                    }
                `}
            </style>
        </>
    )
}
