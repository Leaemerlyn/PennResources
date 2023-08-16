import { Panel, Tag, IconButton, Notification, useToaster } from "rsuite";
import { FaThumbsUp } from "react-icons/fa"; // Importing thumbs-up icons
import "./ResourceCard.css";
import { useState, useEffect } from "react";
import { database, auth } from '../config/firebase';
import { doc, updateDoc, getDoc } from 'firebase/firestore';

export function ResourceCard({ loggedIn, resource, type=[]}) {
  const [hover, setHover] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(resource.Likes);
  const toaster = useToaster();

  const currentUser = auth.currentUser;
  const currentUID = currentUser.uid;

  useEffect(() => {
    const checkLikes = () => {
      var currentLikers = resource.Likers;
      currentLikers.forEach((userID) => {
        if (userID === currentUID) {
          setLiked(true);
          return;
        }
      })
    };

    checkLikes();

  }, [])


  const signInMessage = (
    <Notification type={"info"} header={"Informational"}>
      <p>You need to sign in to save your likes</p>
    </Notification>
  )

  const changeLikeCount = async(event) => {

    var indexOfUID = null;

    if (loggedIn['loggedIn'] === true) {

      event.stopPropagation();

      const currResource = doc(database, "resources", resource.id);
      const resourceDoc  = await getDoc(currResource);
      var currentLikes = 0;
      const likersList = resourceDoc.data()["Likers"];

      likersList.forEach((userID) => {
        if (userID !== null) {
          currentLikes += 1;
        }
      })

      indexOfUID = likersList.indexOf(currentUID);
      
      if (liked === true) {

        if (indexOfUID >= 0) {
          likersList[indexOfUID] = null;
        }

        setLikeCount(currentLikes - 1);
        await updateDoc(currResource, {
          Likes: currentLikes - 1,
          Likers: likersList
        })

      } else {

        if (indexOfUID === -1) {
          likersList.push(currentUID);
        }

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
      <Panel header={resource.title}
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


