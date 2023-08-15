import { Panel, Tag, IconButton} from "rsuite";
import { FaThumbsUp } from "react-icons/fa"; // Importing thumbs-up icons
import "./ResourceCard.css";
import { useState } from "react";
import { database } from '../config/firebase';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';

export function ResourceCard({ docID, course, description, likes, link, title, type=[], contributor }) {
  const [hover, setHover] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const changeLikeCount = async(event) => {
    console.log(liked);
    console.log(likeCount);
    event.stopPropagation();

    const currContribution = doc(database, "resources", docID);

    if (liked === true) {
      setLikeCount(likeCount - 1);
      await updateDoc(currContribution, {
        Likes: likeCount - 1
      })
    } else {
      setLikeCount(likeCount + 1);
      await updateDoc(currContribution, {
        Likes: likeCount + 1
      })
    }

    setLiked(!liked);
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
            <IconButton icon={<div>{liked ? <FaThumbsUp style={{color:'red', size: '0.8em'}}/> : <FaThumbsUp size='0.8em' />}</div>} size="xs" onClick={changeLikeCount} />
            <Tag color="black" size="md">{likeCount}</Tag>
          </div>
          <p>By: {contributor}</p>
        </div>
      </Panel>
    </div>
  );
}


