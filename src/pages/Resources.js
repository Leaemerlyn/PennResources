import { useState } from 'react';
import { CheckPicker, Row, Col } from 'rsuite';
import { ResourceCard } from '../components/ResourceCard';
import "./Resources.css";
import { Welcome } from '../components/Welcome';

const courseData = ["591", "592", "593", "594", "595", "596", "555"].map(item =>({label: item, value: item}));
const moduleData = ["General", "Module 1", "Module 2", "Module 3"].map(item =>({label: item, value: item}));

export function Resources() {
    const [selectedCourse, setSelectedCourse] = useState([]);

    return(
        <div className="ResourcesContainer">
            <div className="criteria">
                <CheckPicker data={courseData} onChange={(value, e) => setSelectedCourse(value)}/>
                <CheckPicker data={moduleData}/>
            </div>

            {selectedCourse.length === 0 ? <Welcome/>:
                <div className='cards'>
                    <ResourceCard />
                    <ResourceCard />
                </div>
            }

            
        </div>
    )
}