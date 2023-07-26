import { Button, SelectPicker } from 'rsuite';
import "./MyContributions.css";
import { ContributionCard } from '../components/ContributionCard';
import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { database, auth } from "../config/firebase";
import { Contribute } from './Contribute';

const courseOptions = ["591", "592", "593", "594", "595", "596", "515", "521", "530", "545", "547", "549", "550", "551", "553", "555", "581", "582", "575", "541", "542", "546"].map(item => ({ label: item, value: item }));
const moduleOptions = ["Module 1", "Module 2", "Module 3", "Module 4", "Module 5", "Module 6", "Module 7", "Module 8", "Module 9", "Module 10", "Module 11", "Module 12", "Module 13"].map(item => ({ label: item, value: item }));

export function MyContributions({loggedIn}) {
  const [contributionsList, setContributionsList] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);

  const getContributions = async () => {
    const currentUser = auth.currentUser;
    const currentUID = currentUser.uid;
    const resourcesCollection = collection(database, "resources");

    let contributions = [];
    for (let i = 0; i < selectedCourse.length; i++) {
      let courseQuery = query(
        resourcesCollection,
        where("uid", "==", currentUID),
        where("Course", "==", selectedCourse[i])
      );

      if (selectedModule) {
        courseQuery = query(
          resourcesCollection,
          where("uid", "==", currentUID),
          where("Course", "==", selectedCourse[i]),
          where("Module", "==", selectedModule)
        );
      }

      const querySnapshot = await getDocs(courseQuery);
      const courseContributions = querySnapshot.docs.map((contributionDoc) => ({
        ...contributionDoc.data(),
        id: contributionDoc.id
      }));

      contributions = [...contributions, ...courseContributions];
    }

    setContributionsList(contributions);
  };

  useEffect(() => {
    getContributions();
  }, [selectedCourse, selectedModule]);

  const [addingResource, setAddingResource] = useState(false);

  const handleCourseFilter = (values) => {
    setSelectedCourse(values);
  };

  const handleModuleFilter = (value) => {
    setSelectedModule(value);
  };

  if (loggedIn) {
    return (
      <div className="contributionCardContainer">
        {addingResource ? (
          <></>
        ) : (
          <h4>
            {contributionsList.length === 0
              ? "No resources found. Click below to start adding resources."
              : "Here are all your contributions to Penn Resources"}
          </h4>
        )}
        {addingResource ? (
          <Contribute setAddingResource={setAddingResource} getContributions={getContributions} />
        ) : (
          <div>
            <div className="filterContainer">
              <SelectPicker
                data={courseOptions}
                value={selectedCourse}
                onChange={handleCourseFilter}
                placeholder="Select"
                className="filterInput"
                multi
              />
              <SelectPicker
                data={moduleOptions}
                value={selectedModule}
                onChange={handleModuleFilter}
                placeholder="Select"
                className="filterInput"
              />
            </div>
            {contributionsList.map((contribution) => (
              <ContributionCard
                key={contribution.id}
                getContributions={getContributions}
                course={contribution.Course}
                module={contribution.Module}
                link={contribution.Link}
                description={contribution.Description}
                title={contribution.Title}
                anonymity={contribution.Anonymity}
                type={contribution.Type}
                docID={contribution.id}
              />
            ))}
          </div>
        )}
        {addingResource ? (
          <></>
        ) : (
          <Button
            appearance="ghost"
            className="addResource"
            onClick={() => setAddingResource(true)}
          > Add Resources
          </Button>
        )}
      </div>
    );
  }
}
