import { useState, useEffect } from 'react';
import { CheckPicker, Row, Col } from 'rsuite';
import { ResourceCard } from '../components/ResourceCard';
import "./Resources.css";
import { Welcome } from '../components/Welcome';
import { database } from '../config/firebase';
import { collection, query, where, getDocs } from "firebase/firestore";

const courseData = ["591", "592", "593", "594", "595", "596", "555"].map(item =>({label: item, value: item}));
const moduleData = ["Module 1", "Module 2", "Module 3", "Module 4", "Module 5", "Module 6", "Module 7", "Module 8", "Module 9", "Module 10", "Module 11", "Module 12", "Module 13"].map(item =>({label: item, value: item}));

export function Resources() {
    const [selectedCourse, setSelectedCourse] = useState([]);
    const [courseList, setCourseList] = useState([]);
    const coursesCollectionRef = collection(database, "resources");
    // const q = query(collection(coursesCollectionRef, "resources"), where("Course", "in", selectedCourse));
    // console.log(q);

    useEffect(() => {
        const getCourseList = async () => {
            try{
                const data = await getDocs(coursesCollectionRef);
                const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
                console.log(filteredData);
                // filteredData.map((resource) => {if (selectedCourse.includes(resource.Course)){setCourseList([...courseList, resource])} })
                // console.log(selectedCourse)
                setCourseList(filteredData);
            } catch (err){
                console.log(err);
            }
        };
        getCourseList();
    }, [selectedCourse]);


    return(
        <div className="ResourcesContainer">
            <div className="criteria">
                <CheckPicker data={courseData} onChange={(value, e) => setSelectedCourse(value)}/>
                <CheckPicker data={moduleData}/>
            </div>

            {selectedCourse.length === 0 ? <Welcome/>:
                <div className='cards'>

                    {courseList.map((course) => (
                        <ResourceCard course={course.Course} description={course.Description} link={course.Link} module={course.Module} title={course.Title} type={course.Type} contributor={course.Contributor}/>
                    ))}
                </div>
            }

            
        </div>
    )
}