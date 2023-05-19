import { Button, CheckPicker, Input, InputPicker } from 'rsuite';
import "./MyContributions.css"
import { ContributionCard } from './ContributionCard';
import { useState } from 'react';
import { Contribute } from './Contribute';

const course = ["591", "592"].map(item => ({ label: item, value: item }));
const module = ["Module 1", "Module 2"].map(item => ({ label: item, value: item }));

const resourceType = ["Video", "Reading", "Practice Problem"].map(item =>({label: item, value: item}));


export function MyContributions () {
    const [addingResource, setAddingResource] = useState(false);

    return(
        <div className="contributionCardContainer">  
            {addingResource ? <></> : <h4>Here are all your contributions to Penn Resources</h4>}
            {addingResource ? <Contribute setAddingResource={setAddingResource}/> : <ContributionCard/>}
            {addingResource ? <></> : <Button appearance='ghost' className="addResource" onClick={() => setAddingResource(true)}>Add Resources</Button>}
            
        </div>
    )
}