import { Panel, Tag, IconButton, Notification, useToaster } from "rsuite";
import { FaThumbsUp } from "react-icons/fa"; // Importing thumbs-up icons
import "./ResourceCard.css";
import { useState, useEffect } from "react";
import { database, auth } from '../config/firebase';
import { doc, updateDoc, getDoc } from 'firebase/firestore';

export function ResourceCard({ loggedIn, docID, course, description, likes, likers, link, title, type=[], contributor }) {
  const [hover, setHover] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes); 

  const toaster = useToaster();

  const signInMessage = (
    <Notification type={"info"} header={"Informational"}>
      <p>You need to sign in to save your likes</p>
    </Notification>
  )

  const changeLikeCount = async(event) => {

    const currentUser = auth.currentUser;
    const currentUID = currentUser.uid;
    var indexOfUID = null;

    if (loggedIn['loggedIn'] === true) {

      event.stopPropagation();

      const currResource = doc(database, "resources", docID);
      const resource  = await getDoc(currResource);
      var currentLikes = 0;
      const likersList = resource.data()["Likers"];

      likersList.forEach((userID) => {
        if (userID !== null) {
          currentLikes += 1;
        }
      })
      
      console.log("Current");
      console.log(currentLikes);

      indexOfUID = likersList.indexOf(currentUID);
      
      if (liked === true) {
        console.log("Decrement");
        console.log(currentLikes);

        if (indexOfUID >= 0) {
          likersList[indexOfUID] = null;
        }

        setLikeCount(currentLikes - 1);
        await updateDoc(currResource, {
          Likes: currentLikes - 1,
          Likers: likersList
        })

      } else {

        console.log("Increment");
        console.log(currentLikes);

        if (indexOfUID === -1) {
          likersList.push(currentUID);
        }
        console.log(likersList);

        setLikeCount(currentLikes + 1);
        await updateDoc(currResource, {
          Likes: currentLikes + 1,
          Likers: likersList
        })
      }

      setLiked(!liked);

    } else {

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
      <Panel header={title}
        bordered onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} shaded={hover} style={{ cursor: 'pointer' }} onClick={() => window.open(link, '_blank', 'noreferrer')}>
        <p>{description}</p>
        <br></br>
        <div className="bottomInfo" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div id="tagList">
            {arrayType.map(singleTag => <Tag>{singleTag}</Tag>)}
            <Tag>{course}</Tag>
            <IconButton icon={
            <div>
              {liked ? <FaThumbsUp style={{color:'red', size: '0.8em'}}/> : <FaThumbsUp size='0.8em' />}
            </div>
            }
            size="xs" onClick={changeLikeCount} 
            />
            <Tag color="black" size="md">{likeCount}</Tag>
          </div>
          <p>By: {contributor}</p>
        </div>
      </Panel>
    </div>
  );
}


