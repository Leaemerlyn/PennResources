import { useState, useEffect } from 'react';
import { CheckPicker, useToaster } from 'rsuite';
import { ResourceCard } from '../components/ResourceCard';
import { Welcome } from '../components/Welcome';
import { database } from '../config/firebase';
import { collection, query, where, getDocs } from "firebase/firestore";
import "./Resources.css";
import { courseOptions, moduleOptions } from '../util';
import { popUpKey } from '../popUpKey';

export function Resources( loggedIn, page ) {
  const [selectedCourse, setSelectedCourse] = useState([]);
  const [selectedModule, setSelectedModule] = useState([]);
  const [courseList, setCourseList] = useState([]);

  const coursesCollectionRef = collection(database, "resources");

  const toaster = useToaster();

  useEffect(() => {
    const removePopUp = () => {
      if (popUpKey.has("delete")) {
        toaster.remove(popUpKey.get("delete"));
      }
    };

    removePopUp();
  }, [page])

  useEffect(() => {
    const getCourseList = async () => {
      try {
        if (selectedCourse.length > 0 || selectedModule.length > 0) {
          let q = coursesCollectionRef;

          if (selectedCourse.length > 0) {
            q = query(q, where("Course", "in", selectedCourse));
          }

          if (selectedModule.length > 0) {
            q = query(q, where("Module", "in", selectedModule));
          }

          const data = await getDocs(q);
          const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) ;
          
          setCourseList(filteredData);
        } else {
          setCourseList([]);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getCourseList();

  }, [selectedCourse, selectedModule]);

  const renderResourceCards = (courses) => {
    if (courses.length === 0){
      return (<p id="no-resource-message">There are no resources with these criteria. Why don't you add one?</p>)
    } else{
      return courses.map((course) => (
        <ResourceCard key={course.id} loggedIn={loggedIn} resource={course} type={course.Type} />))
    }
  }

  return (
    <div className="ResourcesContainer">
      <div className="criteria">
        <CheckPicker data={courseOptions} onChange={(value, e) => setSelectedCourse(value)} placeholder="Course" style={{ width: 150 }}/>
        <CheckPicker data={moduleOptions} onChange={(value, e) => setSelectedModule(value)} placeholder="Module" style={{ width: 150 }}/>
      </div>

      {selectedCourse.length === 0 && selectedModule.length === 0 ? (
        <Welcome />
      ) : (
        <div className="cards">
          {renderResourceCards(courseList)}
        </div>
      )}
    </div>
  );
}

