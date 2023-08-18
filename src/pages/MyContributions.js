import "./MyContributions.css";
import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { database, auth } from "../config/firebase";
import { Contribute } from './Contribute';
import { ContributionList } from '../components/ContributionList';
import { Edit } from "./Edit";

export function MyContributions({loggedIn}) {
  const [contributionsList, setContributionsList] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [addingResource, setAddingResource] = useState(false);
  const [resourceIdToEdit, setResourceIdToEdit] = useState(null);

  const getContributions = async () => {
    const currentUser = auth.currentUser;
    const currentUID = currentUser.uid;
    const resourcesCollection = collection(database, "resources");
    let queryOnUID = query(resourcesCollection, where("uid", "==", currentUID));

    if (selectedCourse && selectedModule) {
      queryOnUID = query(
        resourcesCollection,
        where("uid", "==", currentUID),
        where("Course", "==", selectedCourse),
        where("Module", "==", selectedModule)
      );
    } else if (selectedCourse) {
      queryOnUID = query(
        resourcesCollection,
        where("uid", "==", currentUID),
        where("Course", "==", selectedCourse)
      );
    } else if (selectedModule) {
      queryOnUID = query(
        resourcesCollection,
        where("uid", "==", currentUID),
        where("Module", "==", selectedModule)
      );
    }

    const queryUIDSnapshot = await getDocs(queryOnUID);
    const userContributions = queryUIDSnapshot.docs.map((contributionDoc) => ({
      ...contributionDoc.data(),
      id: contributionDoc.id
    }));

    setContributionsList(userContributions);
  };

  useEffect(() => {
    const getContributions = async () => {
      const currentUser = auth.currentUser;
      const currentUID = currentUser.uid;
      const resourcesCollection = collection(database, "resources");
      let queryOnUID = query(resourcesCollection, where("uid", "==", currentUID));
  
      if (selectedCourse && selectedModule) {
        queryOnUID = query(
          resourcesCollection,
          where("uid", "==", currentUID),
          where("Course", "==", selectedCourse),
          where("Module", "==", selectedModule)
        );
      } else if (selectedCourse) {
        queryOnUID = query(
          resourcesCollection,
          where("uid", "==", currentUID),
          where("Course", "==", selectedCourse)
        );
      } else if (selectedModule) {
        queryOnUID = query(
          resourcesCollection,
          where("uid", "==", currentUID),
          where("Module", "==", selectedModule)
        );
      }
  
      const queryUIDSnapshot = await getDocs(queryOnUID);
      const userContributions = queryUIDSnapshot.docs.map((contributionDoc) => ({
        ...contributionDoc.data(),
        id: contributionDoc.id
      }));
  
      setContributionsList(userContributions);
    };

    getContributions();
  }, [selectedCourse, selectedModule]);

  const contributionToEdit = contributionsList.find((contribution) => contribution.id === resourceIdToEdit);

  if (loggedIn) {
    return (
      <div className="myContributionContainer">
        { resourceIdToEdit ? 
          <Edit 
            setEditingResource={() => setResourceIdToEdit(null)} 
            getContributions={getContributions} 
            type={contributionToEdit.Type}
            title={contributionToEdit.Title}
            course={contributionToEdit.Course}
            module={contributionToEdit.Module}
            link={contributionToEdit.Link}
            description={contributionToEdit.Description}
            anonymity={contributionToEdit.Anonymity}
            docID={contributionToEdit.id}
            />

        : (addingResource ? 
          <Contribute 
            setAddingResource={setAddingResource}
            getContributions={getContributions}
          />
          :
          <ContributionList 
            setSelectedModule={setSelectedModule}
            setSelectedCourse={setSelectedCourse}
            setResourceIdToEdit={setResourceIdToEdit}
            selectedCourse={selectedCourse}
            selectedModule={selectedModule}
            contributionsList={contributionsList}
            getContributions={getContributions}
            setAddingResource={setAddingResource}
          />)
        }

      </div>
    );
  }
}
