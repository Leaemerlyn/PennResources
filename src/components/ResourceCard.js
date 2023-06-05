import { Button, Panel, Placeholder, Tag } from "rsuite";
import "./ResourceCard.css"
import { useState } from "react";


export function ResourceCard ({course, description, link, title, type, contributor}) {
    const [hover, setHover] = useState(false);

    return (
        <div className="resourceCard" >
        <Panel header={title} bordered onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} shaded={hover} style={{cursor:'pointer'}} onClick={() => window.open(link, '_blank', 'noreferrer')}>
            <p>{description}</p>
            <br></br>
            <div className="bottomInfo">
                {/* {console.log(type)} */}
                <Tag>{type}</Tag>
                <p>By: {contributor}</p>
            </div>
        </Panel>
        </div>
    )
}

