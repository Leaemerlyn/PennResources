import { Button, Panel, Placeholder, Tag } from "rsuite";
import "./ResourceCard.css"
import { useState } from "react";
import EditIcon from '@rsuite/icons/Edit'
import { Edit } from "../pages/Edit";

export function ContributionCard ({getContributions, course, module, link, description, title, type, anonymity, docID, openEditPage}) {

    return (
        <div className="resourceCard" >
        {<Panel header={title} bordered>
            <p>Description: {description}</p>
            <p>Link: {link}</p>
            <br></br>
            <div className="bottomInfo">
                <Tag>{type}</Tag>
                <EditIcon onClick={() => {openEditPage()}} style={{ fontSize: "1.5em", cursor:'pointer'}} />
            </div>
        </Panel>}

        </div>
    )
}