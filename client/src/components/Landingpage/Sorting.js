import React, { useState, useContext } from "react";
import {  Button, Dropdown, Menu } from "antd";
import { LIKE_H_TO_L, LIKE_L_TO_H, TIME_L_TO_H,TIME_H_TO_L } from "../../constants/constants";
import {HackathonContext} from "../../context/HackathonContext"


export default function Sorting() {
    const {setHackathons} = useContext(HackathonContext)
    const {hackathons} = useContext(HackathonContext)

    const [sortName, setSortName] = useState("Sort by Recommended");

    //Method for sorting the Hackathons
    const handleSort = (by)=>{
        let hackathons_data = hackathons
        if(by === LIKE_L_TO_H)
            hackathons_data = [...hackathons_data].sort((a,b)=> a.likes.length - b.likes.length)
        else if(by === LIKE_H_TO_L)
                hackathons_data= [...hackathons_data].sort((a,b)=> b.likes.length - a.likes.length)
        else if(by === TIME_L_TO_H)
            hackathons_data= [...hackathons_data].sort((a,b)=> a.createdAt - b.createdAt)
        else
            hackathons_data = [...hackathons_data].sort((a,b)=> b.createdAt - a.createdAt)
        setSortName(by)
        setHackathons(hackathons_data)
    }

    //sortingMenu Dropdown
    const renderSorting = ()=>{
        return (
        <>
            <Dropdown overlay={menu} placement="bottomRight">
                <Button> {sortName} </Button>
            </Dropdown>
        </>
        )
    }

    //Menu
    const menu = (
        <Menu>
          <Menu.Item onClick={()=>handleSort(LIKE_H_TO_L)}>
              {LIKE_H_TO_L}
          </Menu.Item>
          <Menu.Item onClick={()=>handleSort(LIKE_L_TO_H)}>
              {LIKE_L_TO_H}
          </Menu.Item>
          <Menu.Item onClick={()=>handleSort(TIME_H_TO_L)}>
              {TIME_H_TO_L}
          </Menu.Item>
          <Menu.Item onClick={()=>handleSort(TIME_L_TO_H)}>
            {TIME_L_TO_H}
          </Menu.Item>
        </Menu>
    );

    return (
        <>
            <div className="sort-hackathon-container lr-pad-d lr-pad-m"> 
                {renderSorting()}
            </div>
            <style jsx>{`
                .sort-hackathon-container {
                    float:right;
                }
                .sort-hackathon-container .ant-btn {
                    color: var(--facered) !important;
                    border: 1px solid var(--facered) !important;
                }
                .sort-hackathon-container .ant-btn:hover {
                    color: var(--dove) !important;
                    background-color: var(--facered) !important;
                }
            `}
            </style>
        </>
    )
}
