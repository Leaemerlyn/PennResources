import { Button, Panel, Placeholder, Tag } from "rsuite";
import "./ResourceCard.css"
import { useState } from "react";


export function ResourceCard () {
    const [hover, setHover] = useState(false);

    return (
        <div className="resourceCard" >
        <Panel header="Proof By Contradiction" bordered onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} shaded={hover} style={{cursor:'pointer'}}>
            <p>Watch the first 30 minutes of the video, it is very informative</p>
            <br></br>
            <div className="bottomInfo">
                <Tag>Video</Tag>
                <p>By: Lea Emerlyn</p>
            </div>
        </Panel>
        </div>
    )
}

