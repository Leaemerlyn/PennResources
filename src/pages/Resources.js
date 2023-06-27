import { useState, useEffect } from 'react';
import { CheckPicker } from 'rsuite';
import { ResourceCard } from '../components/ResourceCard';
import { Welcome } from '../components/Welcome';
import { database } from '../config/firebase';
import { collection, query, where, getDocs } from "firebase/firestore";
import "./Resources.css";

const courseData = ["591", "592", "593", "594", "595", "596", "555"].map(item => ({ label: item, value: item }));
const moduleData = ["Module 1", "Module 2", "Module 3", "Module 4", "Module 5", "Module 6", "Module 7", "Module 8", "Module 9", "Module 10", "Module 11", "Module 12", "Module 13"].map(item => ({ label: item, value: item }));

export function Resources() {
  const [selectedCourse, setSelectedCourse] = useState([]);
  const [selectedModule, setSelectedModule] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const coursesCollectionRef = collection(database, "resources");

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
          const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
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

  return (
    <div className="ResourcesContainer">
      <div className="criteria">
        <CheckPicker data={courseData} onChange={(value, e) => setSelectedCourse(value)} />
        <CheckPicker data={moduleData} onChange={(value, e) => setSelectedModule(value)} />
      </div>

      {selectedCourse.length === 0 && selectedModule.length === 0 ? (
        <Welcome />
      ) : (
        <div className="cards">
          {courseList.map((course) => (
            <ResourceCard key={course.id} course={course.Course} description={course.Description} link={course.Link} module={course.Module} title={course.Title} type={course.Type} contributor={course.Contributor}
            />
          ))}
        </div>
      )}
    </div>
  );
}
