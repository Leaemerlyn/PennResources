import { Button } from 'rsuite';
import "./MyContributions.css"
import { ContributionCard } from '../components/ContributionCard';
import { useState, useEffect } from 'react';
import { Contribute } from './Contribute';
import { collection, query, where, getDocs, QuerySnapshot } from 'firebase/firestore';
import { database, auth } from "../config/firebase";

const course = ["591", "592", "593", "594", "595", "596", "515", "521", "530", "545", "547", "549", "550", "551", "553", "555", "581", "582", "575", "541", "542", "546"].map(item => ({ label: item, value: item }));
const module = ["Module 1", "Module 2", "Module 3", "Module 4", "Module 5", "Module 6", "Module 7", "Module 8", "Module 9", "Module 10", "Module 11", "Module 12", "Module 13"].map(item => ({ label: item, value: item }));

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

            // use the docs method to get the array of documents objects from the snapshot
            // use the map method to add each document object's fields to the array userContributions
            const userContributions = queryUIDSnapshot.docs.map((contributionDoc) => ({
                ...contributionDoc.data(), id: contributionDoc.id
            }));
            
            // save the array of user contributions in the state above
            setContributionsList(userContributions);
        };

        // call on the function to get the user contributions
        getContributions();

    }, [])

    const [addingResource, setAddingResource] = useState(false);
    const [showCard, setShowCard] = useState(true);

    return(
        <div className="contributionCardContainer">  
            {addingResource ? <></> : <h4>Here are all your contributions to Penn Resources</h4>}
            {addingResource ? <Contribute setAddingResource={setAddingResource}/> : 
            <div>
                {contributionsList.map((contribution) => (
                <ContributionCard showCard = {showCard} setShowCard = {setShowCard} course = {contribution.Course} module = {contribution.Module} link = {contribution.Link} description = {contribution.Description} title={contribution.Title} 
                anyonymity={contribution.Anyonymity} type={contribution.Type} docID={contribution.id}/>
            ))}
            </div>
            }
            {addingResource ? <></> : <Button appearance='ghost' className="addResource" onClick={() => setAddingResource(true)}>Add Resources</Button>}
        </div>
    )
}
