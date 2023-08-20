import { Panel, Tag } from "rsuite";
import "./ResourceCard.css"
import EditIcon from '@rsuite/icons/Edit'

export function ContributionCard ({link, description, title, type, openEditPage, showName, module, course}) {

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
                <div className="tag-row">
                    {arrayType.map(singleTag => <Tag>{singleTag}</Tag>)}
                    <Tag>{course}</Tag>
                    <Tag>{module}</Tag>
                    <Tag>Show Name on Post: {showName}</Tag>
                </div>
                <EditIcon onClick={() => {openEditPage()}} style={{ fontSize: "1.3em", cursor:'pointer'}} />
            </div>
        </Panel>
        </div>
    )
}