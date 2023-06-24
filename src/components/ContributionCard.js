import { Button, Panel, Placeholder, Tag } from "rsuite";
import "./ResourceCard.css"
import { useState } from "react";
import EditIcon from '@rsuite/icons/Edit'
import { Edit } from "../pages/Edit";

export function ContributionCard ({showCard, course, module, link, description, title, type, docID}) {

    const [editingResource, setEditingResource] = useState(false);

    return (
        <div className="resourceCard" >
            {editingResource ? <Edit setEditingResource={setEditingResource} type = {type} title = {title} course={course} module={module} link={link} 
            description={description} docID={docID}/> : <></>}
        
        {showCard ? 
        <Panel header={title} bordered>
            <p>{description}</p>
            <br></br>
            <div className="bottomInfo">
                <Tag>{type}</Tag>
                <EditIcon onClick={() => {setEditingResource(true)}} style={{ fontSize: "1.5em", cursor:'pointer'}} />
            </div>
        </Panel>
        : <></>}
        </div>
    )
}