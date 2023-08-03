import { Panel, Tag } from "rsuite";
import { FaThumbsUp, FaRegThumbsUp } from "react-icons/fa"; // Importing thumbs-up icons
import "./ResourceCard.css";
import { useState } from "react";

export function ResourceCard({ course, description, link, title, type, contributor }) {
  const [hover, setHover] = useState(false);
  const [liked, setLiked] = useState(false);



  
  const toggleLike = (event) => {
    event.stopPropagation();
    setLiked(!liked);
  };
  

  const customHeader = (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <p style={{ margin: 0, fontWeight: 'normal' }}>{title}</p>
      <p style={{ margin: 0, fontSize: '0.8em', textAlign: 'right' }}>{contributor}</p>
    </div>
  );

  return (
    <div className="resourceCard">
      <Panel header={customHeader} bordered onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} shaded={hover} style={{ cursor: 'pointer' }} onClick={() => window.open(link, '_blank', 'noreferrer')}>
        <p>{description}</p>
        <br></br>
        <div className="bottomInfo" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Tag>{type}</Tag>
          <div onClick={toggleLike} style={{ cursor: 'pointer' }}>
            {liked ? <FaThumbsUp style={{ color: 'robin blue', size: '0.8em' }} /> : <FaRegThumbsUp size='0.8em' />}
          </div>
        </div>
      </Panel>
    </div>
  );
}


