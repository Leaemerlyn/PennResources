import { Button, ButtonToolbar, CheckPicker, Input, InputPicker, Form, Schema, Notification, useToaster } from 'rsuite';
import "./Contribute.css"
import { database } from '../config/firebase';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useState, forwardRef } from 'react';
import { moduleOptions, courseOptions } from '../util';

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

// represents the key that is used to remove the deletion confirmation popup
var deleteKey = null;

export function Edit ({setEditingResource, getContributions, type, title, course, module, link, description, anonymity, docID}) {
    const resourceTypeList = ["Video", "Reading", "Practice Problem"].map(item =>({label: item, value: item}));
    const yesOrNo = ["Yes", "No"].map(item =>({label: item, value: item}));

    const toaster = useToaster();

    // store the original resource data as an object
    const resource = {
        title: title,
        resourceType: type,
        course: course,
        module: module,
        link: link,
        description: description,
        anonymity: anonymity
    }

    // use useState to change the resource data as user edits 
    const [draft, setDraft] = useState(resource);

    const currContribution = doc(database, "resources", docID);

    const updateContribution = async() => {
        console.log(draft)
        
        // only updates if all fields are filled
        if (draft.course !== "" && draft.module !== "" && draft.link.startsWith("https://") && draft.type !== "" &&
        draft.description !== "" && draft.title !== "" && draft.anonymity !== "") {
        await updateDoc(currContribution, {
            Course: draft.course,
            Module: draft.module,
            Link: draft.link,
            Type: draft.resourceType,
            Description: draft.description,
            Title: draft.title,
            Anonymity: draft.anonymity
        })

        setEditingResource(false);

        getContributions();
        }

    }

    const removeDeleteConfirmation = () => {
        toaster.remove(deleteKey);
        setEditingResource(false);
    }

    const cancelEdit = () => {
        setEditingResource(false);
    }

    const deleteConfirmation = (
        <Notification type={"warning"} header={"Warning"}>
            <p>Deleting a resource is permanent. Please confirm or cancel.</p>
            <Button color = 'red' appearance = 'primary' onClick={
                async() => {
                    await deleteDoc(doc(database, "resources", docID));
                    getContributions();
                    setEditingResource(false);
                    removeDeleteConfirmation();
                }
            }
            > Confirm </Button>
            <Button onClick={() => {removeDeleteConfirmation();}}>Cancel</Button>
        </Notification>
    );

    const showDeleteConfirmation = async() => {
        const k = await toaster.push(deleteConfirmation, {duration: 0});
        deleteKey = k;
    };

    // onChange in the form will update the draft in useState as user edits
    return(

        <div className="contributeContainer">
            <h4>Editing Resource</h4>
            <Form fluid model={formRequirements} formValue={draft} onChange={formValue => setDraft(formValue)}>

                <Form.Group controlID="course">
                    <Form.Control name="course" placeholder={course} accepter={InputPicker} data={courseOptions}/>
                </Form.Group>

                <Form.Group controlID="module">
                    <Form.Control name="module" placeholder={module} accepter={InputPicker} data={moduleOptions}/>
                </Form.Group>

                <Form.Group controlID="resourceType">
                    <Form.Control name="resourceType" placeholder={type} accepter={CheckPicker} data={resourceTypeList}/>
                </Form.Group>

                <Form.Group controlId="anonymity">
                    <Form.Control name="anonymity" placeholder={anonymity} accepter={InputPicker} data={yesOrNo}/>
                </Form.Group>

                <Form.Group controlId="title">
                    <Form.Control name="title" placeholder={title}/>
                </Form.Group>

                <Form.Group controlId="link">
                    <Form.Control name="link" placeholder={link}/>
                </Form.Group>

                <Form.Group controlId="description">
                    <Form.Control name="description" rows={5} placeholder={description} accepter={descriptionBox}/>
                </Form.Group>

                <ButtonToolbar>
                    <Button onClick={cancelEdit}>Cancel</Button>
                    <Button appearance="primary" type="submit" onClick={updateContribution}>Submit</Button>
                    <Button color = "red" appearance = "primary" onClick={showDeleteConfirmation}>Delete (Permanent)</Button>
                </ButtonToolbar>
            </Form>
        </div>
    )
}
