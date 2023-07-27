import { Button, ButtonToolbar, CheckPicker, Input, InputPicker, Form, Schema } from 'rsuite';
import "./Contribute.css"
import { database, auth } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useState, forwardRef} from 'react';
import { courseOptions, moduleOptions } from '../util';

// forwardRef allows the Input component to be used in the Form below
// not sure how it works
const descriptionBox = forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref}/>);

// this sets up the rule for each field
// the rules are each field cannot be blank and link must be a valid URL
const formRequirements = Schema.Model({
    title: Schema.Types.StringType().isRequired("Required"),
    course: Schema.Types.StringType().isRequired("Required"),
    module: Schema.Types.StringType().isRequired("Required"),
    link: Schema.Types.StringType()
        .isRequired("Required")
        .pattern(new RegExp("https://[\\S]*"), "Link must start with https://"),
    resourceType: Schema.Types.ArrayType().isRequired("Required"),
    description: Schema.Types.StringType().isRequired("Required"),
    anonymity: Schema.Types.StringType().isRequired("Required"),
})

export function Contribute ({setAddingResource, getContributions}) {

    const resourceTypeList = ["Video", "Reading", "Practice Problem"].map(item =>({label: item, value: item}));
    const yesOrNo = ["Yes", "No"].map(item =>({label: item, value: item}));

    // initialize states to store the user inputs
    // the set functions are used as the onChange functions in the components below
    const [courseSelection, setCourseSelection] = useState("");
    const [moduleSelection, setModuleSelection] = useState("");
    const [URL, setURL] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");
    const [anonymity, setAnonymity] = useState("");

    // get the current user to get their email, name, and uid
    var currentUser = auth.currentUser;

    // adds a document to the database using the states saved above
    // Edited to allow for anonymous submission
    const saveEntry = async() => {
        // only adds the document if everything is filled out
        if (courseSelection !== "" && moduleSelection !== "" && URL.startsWith("https://") && 
        type !== "" && description !== "" && title !== "" && anonymity !== "") {
            addDoc(collection(database, "resources"), {
            Contributor: anonymity === "No" ? "Anonymous" : currentUser.displayName,
            Course: courseSelection,
            Description: description,
            Title: title,
            Likes: 0,
            Link: URL,
            Module: moduleSelection,
            Type: type,
            uid: currentUser.uid,
            Anonymity: anonymity
            })
    
            getContributions();
        }
        setAddingResource(false);
    };
    

    return(
        <div className="contributeContainer">
            <h4> Add a resource to help out fellow students!</h4>
            <Form fluid model={formRequirements}>

                <Form.Group controlID="course">
                    <Form.Control name="course" placeholder="Course" accepter={InputPicker} data={courseOptions} onChange={setCourseSelection} isRequired/>
                </Form.Group>

                <Form.Group controlID="module">
                    <Form.Control name="module" placeholder="Module" accepter={InputPicker} data={moduleOptions} onChange={setModuleSelection} isRequired/>
                </Form.Group>

                <Form.Group controlID="resourceType">
                    <Form.Control name="resourceType" placeholder="Type of Resource" accepter={CheckPicker} data={resourceTypeList} onChange={setType} isRequired/>
                </Form.Group>

                <Form.Group controlId="anonymity">
                    <Form.Control name="anonymity" placeholder="Show name in post?" accepter={InputPicker} data={yesOrNo} onChange={setAnonymity} isRequired/>
                </Form.Group>

                <Form.Group controlId="title">
                    <Form.Control name="title" placeholder="Title" onChange={setTitle} isRequired/>
                </Form.Group>

                <Form.Group controlId="link">
                    <Form.Control name="link" placeholder="Link" onChange={setURL} isRequired/>
                </Form.Group>

                <Form.Group controlId="description">
                    <Form.Control name="description" rows={5} placeholder="Give a brief description" accepter={descriptionBox} onChange={setDescription} isRequired/>
                </Form.Group>

                <ButtonToolbar>
                    <Button onClick={() => setAddingResource(false)}>Cancel</Button>
                    <Button appearance='primary' type='submit' onClick={saveEntry}>Submit</Button>
                </ButtonToolbar>
            </Form>

        </div>
    )
}
