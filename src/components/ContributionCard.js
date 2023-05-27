import { Button, Panel, Placeholder, Tag } from "rsuite";
import "./ResourceCard.css"
import { useState } from "react";
import EditIcon from '@rsuite/icons/Edit'

export function ContributionCard () {

    return (
        <div className="resourceCard" >
        <Panel header="Proof By Contradiction" bordered>
            <p>Watch the first 30 minutes of the video, it is very informative</p>
            <br></br>
            <div className="bottomInfo">
                <Tag>Video</Tag>
                <EditIcon style={{ fontSize: "1.5em", cursor:'pointer'}} />
            </div>
        </Panel>
        </div>
    )
}