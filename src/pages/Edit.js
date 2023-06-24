import { Button, CheckPicker, Input, InputGroup, InputPicker } from 'rsuite';
import "./Contribute.css"
import { database } from '../config/firebase';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useState } from 'react';

export function Edit ({setEditingResource, type, title, course, module, link, description, docID}) {

    const courseList = ["591", "592"].map(item => ({ label: item, value: item }));
    const moduleList = ["Module 1", "Module 2"].map(item => ({ label: item, value: item }));
    const resourceType = ["Video", "Reading", "Practice Problem"].map(item =>({label: item, value: item}));
   
    // initialize states to store the user inputs
    // the set functions are used as the onChange functions in the components below
    const [newCourseSelection, setNewCourseSelection] = useState("");
    const [newModuleSelection, setNewModuleSelection] = useState("");
    const [newURL, setNewURL] = useState("");
    const [newType, setNewType] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newTitle, setNewTitle] = useState("");

    const currContribution = doc(database, "resources", docID);

    const updateContribution = async() => {
        
        await updateDoc(currContribution, {
            Course: newCourseSelection,
            Module: newModuleSelection,
            Link: newURL,
            Type: newType,
            Description: newDescription,
            Title: newTitle
        })

    }

    const deleteContribution = async() => {
        await deleteDoc(doc(database, "resources", docID));
    }

    return(
        <div className="contributeContainer">
            <h5>Please edit your contribution below. Thank you!</h5>
            <Input placeholder={title} onChange={setNewTitle}/>
            <InputPicker data={courseList} placeholder={course} onChange={setNewCourseSelection}/>
            <InputPicker data={moduleList} placeholder={module} onChange={setNewModuleSelection}/>
            <InputGroup>
                <InputGroup.Addon>https://</InputGroup.Addon>
                <Input placeholder={link} onChange={setNewURL}/>
            </InputGroup>
            <CheckPicker data={resourceType} placeholder={type} onChange={setNewType}/>
            <Input as="textarea" rows={3} placeholder={description} onChange={setNewDescription}/>
            <Input placeholder='Optionally, add your name and email'/>

            <Button onClick={() => {setEditingResource(false)}}>Cancel</Button>
            <Button appearance='primary' onClick={updateContribution}>Update</Button>
            <Button color = 'red' appearance = 'primary' onClick={deleteContribution}>Delete (permanent)</Button>
        </div>
    )
}
