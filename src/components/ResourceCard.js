import { Panel, Tag, IconButton, Notification, useToaster } from "rsuite";
import { FaThumbsUp } from "react-icons/fa"; // Importing thumbs-up icons
import "./ResourceCard.css";
import { useState, useEffect } from "react";
import { database, auth } from '../config/firebase';
import { doc, updateDoc, getDoc } from 'firebase/firestore';

export function ResourceCard({ changeCourseList, loggedIn, resource, type=[]}) {
  const [hover, setHover] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(resource.Likes);
  const toaster = useToaster();

  useEffect(() => {
    const checkLikes = async() => {

      const currResource = doc(database, "resources", resource.id);
      const resourceDoc  = await getDoc(currResource);

      if (loggedIn["loggedIn"] === true) {

        const currentUser = auth.currentUser;
        const currentUID = currentUser.uid;

        const likersList = resourceDoc.data()["Likers"];

        likersList.forEach((userID) => {

          // check if user already liked the resource
          if (userID === currentUID) {
              setLiked(true);
          }
        })
      }
    }

    checkLikes();

  }, [loggedIn["loggedIn"]])

  const signInMessage = (
    <Notification type={"info"} header={"Informational"}>
      <p>You need to sign in to save your likes</p>
    </Notification>
  )

  // adjust the number of likes for this resource
  // the UIDs of likers are stored in an array in Firebase
  // if a user stops liking a resource, its UID in the
  // array is replaced with a null
  const changeLikeCount = async(event) => {

    if (loggedIn['loggedIn'] === true) {

      // prevent forwarding to other pages
      event.stopPropagation();

      const currentUser = auth.currentUser;
      const currentUID = currentUser.uid;

      // index of the user's UID
      var indexOfUID = null;

      // get the most current array of likers
      const currResource = doc(database, "resources", resource.id);
      const resourceDoc  = await getDoc(currResource);
      var currentLikes = 0;
      const likersList = resourceDoc.data()["Likers"];

      likersList.forEach((userID) => {
        // count number of valid likes in the array
        if (userID !== null) {
          currentLikes += 1;
        }
      })

      // get the index of this user's UID in the array
      // if not present, index is -1
      indexOfUID = likersList.indexOf(currentUID);
      
      // decrement like count
      if (liked === true) {

        // set the user's UID in the array to null as needed
        if (indexOfUID >= 0) {
          likersList[indexOfUID] = null;
        }

        setLiked(false);

        // update likes and array of likers in Firebase
        setLikeCount(currentLikes - 1);
        await updateDoc(currResource, {
          Likes: currentLikes - 1,
          Likers: likersList
        })
        
      // increment like count
      } else {

        // append the user's UID into the array as needed
        if (indexOfUID === -1) {
          likersList.push(currentUID);
        }

        setLiked(true);

        // update likes and array of likers in Firebase
        setLikeCount(currentLikes + 1);
        await updateDoc(currResource, {
          Likes: currentLikes + 1,
          Likers: likersList
        })
      }

    } else {

      // only loggedin users can like a resource
      event.stopPropagation();
      toaster.push(signInMessage, {duration: 3000});
    }
  }

  const arrayType = [];
  for (const one of type){
    arrayType.push(one);
  }

  return (
    <div className="resourceCard">
      <Panel header={resource.Title}
        bordered onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} shaded={hover} style={{ cursor: 'pointer' }} onClick={() => window.open(resource.Link, '_blank', 'noreferrer')}>
        <p>{resource.Description}</p>
        <br></br>
        <div className="bottomInfo" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div id="tagList">
            {arrayType.map(singleTag => <Tag>{singleTag}</Tag>)}
            <Tag>{resource.Course}</Tag>
            <IconButton icon={
            <div>
              {liked ? <FaThumbsUp style={{color:'red', size: '0.8em'}}/> : <FaThumbsUp size='0.8em' />}
            </div>
            }
            size="xs" onClick={changeLikeCount} 
            />
            <Tag color="black" size="md">{likeCount}</Tag>
          </div>
          <p>By: {resource.Contributor}</p>
        </div>
      </Panel>
    </div>
  );
}

