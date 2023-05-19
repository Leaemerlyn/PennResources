import { CheckPicker, Input, InputPicker } from 'rsuite';

const course = ["591", "592"].map(item => ({ label: item, value: item }));
const module = ["Module 1", "Module 2"].map(item => ({ label: item, value: item }));

const resourceType = ["Video", "Reading", "Practice Problem"].map(item =>({label: item, value: item}));


export function Contribute () {
    return(
        <>
            <InputPicker data={course} style={{ width: 224 }} placeholder="Course"/>
            <InputPicker data={module} style={{ width: 224 }} placeholder="Module"/>
            <Input placeholder='Link'/>
            <CheckPicker data={resourceType} placeholder="Type of Resource"/>
            <Input as="textarea" rows={3} placeholder="Give a description of the resource" />

        </>
    )
}