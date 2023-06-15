import { Button, CheckPicker, Input, InputPicker } from 'rsuite';
import "./Contribute.css"
import { ContributionCard } from '../components/ContributionCard';
import { database, auth } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useState } from 'react';

const course = ["591", "592"].map(item => ({ label: item, value: item }));
const module = ["Module 1", "Module 2"].map(item => ({ label: item, value: item }));

const resourceType = ["Video", "Reading", "Practice Problem"].map(item =>({label: item, value: item}));

export function Contribute ({setAddingResource}) {

    // initialize states to store the user inputs
    // the set functions are used as the onChange functions in the components below
    const [courseSelection, setCourseSelection] = useState("");
    const [moduleSelection, setModuleSelection] = useState("");
    const [URL, setURL] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");
    
    // get the current user to get their email, name, and uid
    var currentUser = auth.currentUser;

    // adds a document to the database using the states saved above
    const saveEntry = async() => addDoc(collection(database, "resources"), {
        Contributor: currentUser.displayName,
        Course: courseSelection,
        Description: description,
        Title: title,
        Likes: 0,
        Link: URL,
        Module: moduleSelection,
        Type: type,
        uid: currentUser.uid
    });


    return(
        <div className="contributeContainer">
            <h5>Add a resource to help out fellow students!</h5>
            <Input placeholder='Title' onChange={setTitle}/>
            <InputPicker data={course} placeholder="Course" onChange={setCourseSelection}/>
            <InputPicker data={module} placeholder="Module" onChange={setModuleSelection}/>
            <Input placeholder='Link' onChange={setURL}/>
            <CheckPicker data={resourceType} placeholder="Type of Resource" onChange={setType}/>
            <Input as="textarea" rows={3} placeholder="Give a description of the resource" onChange={setDescription}/>
            <Input placeholder='Optionally, add your name and email'/>

            <Button onClick={() => setAddingResource(false)}>Cancel</Button>
            <Button appearance='primary' onClick={saveEntry}>Submit</Button>
        </div>
    )
}
