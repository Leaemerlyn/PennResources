import { Button, CheckPicker, Input, InputPicker } from 'rsuite';
import "./Contribute.css"
import { ContributionCard } from './ContributionCard';

const course = ["591", "592"].map(item => ({ label: item, value: item }));
const module = ["Module 1", "Module 2"].map(item => ({ label: item, value: item }));

const resourceType = ["Video", "Reading", "Practice Problem"].map(item =>({label: item, value: item}));


export function Contribute ({setAddingResource}) {
    return(
        <div className="contributeContainer">
            <h5>Add a resource to help out fellow students!</h5>
            <InputPicker data={course} placeholder="Course"/>
            <InputPicker data={module} placeholder="Module"/>
            <Input placeholder='Link'/>
            <CheckPicker data={resourceType} placeholder="Type of Resource"/>
            <Input as="textarea" rows={3} placeholder="Give a description of the resource" />
            <Input placeholder='Optionally, add your name and email'/>

            <Button onClick={() => setAddingResource(false)}>Cancel</Button>
            <Button appearance='primary'>Submit</Button>
        </div>
    )
}