import { Button, ButtonToolbar, CheckPicker, Input, InputPicker, Form, Schema } from 'rsuite';
import "./Contribute.css"
import { database } from '../config/firebase';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useState, forwardRef } from 'react';

// forwardRef allows the Input component to be used in the Form below
// not sure how it works
const descriptionBox = forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref}/>);

// this sets up the rule for each field
// the only rule is that each field cannot be blank
// TODO add a rule to make the URL start with https:// (probably need regex)
const formRequirements = Schema.Model({
    title: Schema.Types.StringType().isRequired("Required"),
    course: Schema.Types.StringType().isRequired("Required"),
    module: Schema.Types.StringType().isRequired("Required"),
    link: Schema.Types.StringType().isRequired("Required"),
    resourceType: Schema.Types.ArrayType().isRequired("Required"),
    description: Schema.Types.StringType().isRequired("Required"),
    anonymity: Schema.Types.StringType().isRequired("Required"),
})

export function Edit ({setEditingResource, type, title, course, module, link, description, anonymity, docID}) {

    const courseList = ["591", "592", "593", "594", "595", "596", "515", "521", "530", "545", "547", "549", "550", "551", "553", "555", "581", "582", "575", "541", "542", "546"].map(item => ({ label: item, value: item }));
    const moduleList = ["Module 1", "Module 2", "Module 3", "Module 4", "Module 5", "Module 6", "Module 7", "Module 8", "Module 9", "Module 10", "Module 11", "Module 12", "Module 13"].map(item => ({ label: item, value: item }));
    const resourceTypeList = ["Video", "Reading", "Practice Problem"].map(item =>({label: item, value: item}));
    const yesOrNo = ["Yes", "No"].map(item =>({label: item, value: item}));

    // initialize states to store the user inputs
    // the set functions are used as the onChange functions in the components below
    const [newCourseSelection, setNewCourseSelection] = useState("");
    const [newModuleSelection, setNewModuleSelection] = useState("");
    const [newURL, setNewURL] = useState("");
    const [newType, setNewType] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newTitle, setNewTitle] = useState("");
    const [newAnonymity, setNewAnonymity] = useState("");

    const currContribution = doc(database, "resources", docID);

    const updateContribution = async() => {
        
        // only updates if all fields are filled
        if (newCourseSelection !== "" && newModuleSelection !== "" && newURL !== "" && newType !== "" &&
        newDescription !== "" && newTitle !== "" && newAnonymity !== "") {
        await updateDoc(currContribution, {
            Course: newCourseSelection,
            Module: newModuleSelection,
            Link: newURL,
            Type: newType,
            Description: newDescription,
            Title: newTitle,
            Anonymity: newAnonymity
        })
        }
    }

    const deleteContribution = async() => {
        await deleteDoc(doc(database, "resources", docID));
    }

    return(
        <div className="contributeContainer">
            <Form fluid model={formRequirements}>

                <Form.Group controlID="course">
                    <Form.Control name="course" placeholder={course} accepter={InputPicker} data={courseList} onChange={setNewCourseSelection}/>
                </Form.Group>

                <Form.Group controlID="module">
                    <Form.Control name="module" placeholder={module} accepter={InputPicker} data={moduleList} onChange={setNewModuleSelection}/>
                </Form.Group>

                <Form.Group controlID="resourceType">
                    <Form.Control name="resourceType" placeholder={type} accepter={CheckPicker} data={resourceTypeList} onChange={setNewType}/>
                </Form.Group>

                <Form.Group controlId="anonymity">
                    <Form.Control name="anonymity" placeholder={anonymity} accepter={InputPicker} data={yesOrNo} onChange={setNewAnonymity}/>
                </Form.Group>

                <Form.Group controlId="title">
                    <Form.Control name="title" placeholder={title} onChange={setNewTitle}/>
                </Form.Group>

                <Form.Group controlId="link">
                    <Form.Control name="link" placeholder={link} onChange={setNewURL}/>
                </Form.Group>

                <Form.Group controlId="description">
                    <Form.Control name="description" rows={5} placeholder={description} accepter={descriptionBox} onChange={setNewDescription}/>
                </Form.Group>

                <ButtonToolbar>
                    <Button onClick={() => setEditingResource(false)}>Cancel</Button>
                    <Button appearance='primary' type='submit' onClick={updateContribution}>Submit</Button>
                    <Button color = 'red' appearance = 'primary' onClick={deleteContribution}>Delete (Permanent)</Button>
                </ButtonToolbar>
            </Form>
        </div>
    )
}
