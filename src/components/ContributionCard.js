import { Button, Panel, Placeholder, Tag } from "rsuite";
import "./ResourceCard.css"
import { useState } from "react";
import EditIcon from '@rsuite/icons/Edit'
import { Edit } from "../pages/Edit";

export function ContributionCard ({link, description, title, type, openEditPage}) {

    const arrayType = [];
    for (const one of type){
        arrayType.push(one);
    }
    return (
        <div className="resourceCard" >
        <Panel header={title} bordered>
            <p>Description: {description}</p>
            <p>Link: {link}</p>
            <br></br>
            <div className="bottomInfo">
                <div>{arrayType.map(singleTag => <Tag>{singleTag}</Tag>)}</div>
                <EditIcon onClick={() => {openEditPage()}} style={{ fontSize: "1.3em", cursor:'pointer'}} />
            </div>
        </Panel>
        </div>
    )
}