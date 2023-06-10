import { Button, Panel, Placeholder, Tag } from "rsuite";
import "./ResourceCard.css"
import { useState } from "react";
import EditIcon from '@rsuite/icons/Edit'

export function ContributionCard ({description, title, type}) {

    return (
        <div className="resourceCard" >
        <Panel header={title} bordered>
            <p>{description}</p>
            <br></br>
            <div className="bottomInfo">
                <Tag>{type}</Tag>
                <EditIcon style={{ fontSize: "1.5em", cursor:'pointer'}} />
            </div>
        </Panel>
        </div>
    )
}