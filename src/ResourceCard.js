import { Button, Panel, Placeholder, Tag } from "rsuite";
import "./ResourceCard.css"

export function ResourceCard () {
    return (
        <div className="resourceCard">
        <Panel header="Proof By Contradiction" bordered>
            <p>Watch the first 30 minutes of the video, it is very informative</p>
            <br></br>
            <Button appearance="ghost" size="sm">Go to Link</Button>
            <br></br><br></br>
            <div className="bottomInfo">
                <Tag>Video</Tag>
                <p>By: Lea Emerlyn</p>
            </div>

        </Panel>
        </div>
    )
}

