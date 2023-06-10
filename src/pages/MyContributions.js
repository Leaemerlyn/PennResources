import { Button, CheckPicker, Input, InputPicker } from 'rsuite';
import "./MyContributions.css"
import { ContributionCard } from '../components/ContributionCard';
import { useState, useEffect } from 'react';
import { Contribute } from './Contribute';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { database, auth } from "../config/firebase";
import { queryUIDSnapshot } from '../App';

const course = ["591", "592"].map(item => ({ label: item, value: item }));
const module = ["Module 1", "Module 2"].map(item => ({ label: item, value: item }));

const resourceType = ["Video", "Reading", "Practice Problem"].map(item =>({label: item, value: item})); 

export function MyContributions () {
    // represents the list of contributions by the current user
    const [contributionsList, setContributionsList] = useState([]);

    // queries the database for the user's contributions by UID
    // for each contribution, store the data in an array and save the array
    // in the contributionsList from above
    useEffect(() => {
        const getContributions = async() => {
    
            const currentUser = auth.currentUser;
            const currentUID = currentUser.uid;
            const resourcesCollection = collection(database, "resources");
            const queryOnUID = query(resourcesCollection, where("uid", "==", currentUID));
            const queryUIDSnapshot = await getDocs(queryOnUID);
    
            const userContributions = queryUIDSnapshot.docs.map((contributionDoc) => ({
                ...contributionDoc.data(), id: contributionDoc.id
            }));
    
            setContributionsList(userContributions);
        };
        getContributions();
    })

    const [addingResource, setAddingResource] = useState(false);

    return(
        <div className="contributionCardContainer">  
            {/* <div>
                <Button onClick={getContributions}></Button>
            </div> */}
            {addingResource ? <></> : <h4>Here are all your contributions to Penn Resources</h4>}
            {addingResource ? <Contribute setAddingResource={setAddingResource}/> : 
            <div>
                {contributionsList.map((contribution) => (
                <ContributionCard description = {contribution.Description} title={contribution.Title} type={contribution.Type}/>
            ))}
            </div>
            }
            {addingResource ? <></> : <Button appearance='ghost' className="addResource" onClick={() => setAddingResource(true)}>Add Resources</Button>}
        </div>
    )
}
