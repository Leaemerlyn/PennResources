import { CheckPicker, Row, Col } from 'rsuite';
import { ResourceCard } from './ResourceCard';
import "./Resources.css";

const courseData = ["591", "592", "593", "594", "595", "596"].map(item =>({label: item, value: item}));
const moduleData = ["General", "Module 1", "Module 2", "Module 3"].map(item =>({label: item, value: item}));

export function Resources() {
    return(
        <div className="ResourcesContainer">
            <div className="criteria">
                <CheckPicker data={courseData}/>
                <CheckPicker data={moduleData}/>
            </div>

            <div className='cards'>
                <ResourceCard />
                <ResourceCard />
            </div>


        </div>
    )
}