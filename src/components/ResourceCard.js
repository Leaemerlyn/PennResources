import { Panel, Tag } from "rsuite";
import { FaThumbsUp, FaRegThumbsUp } from "react-icons/fa"; // Importing thumbs-up icons
import "./ResourceCard.css";
import { useState } from "react";

export function ResourceCard({ course, description, link, title, type, contributor }) {
  const [hover, setHover] = useState(false);
  
  return (
    <div className="resourceCard">
      <Panel header={title}
        bordered onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} shaded={hover} style={{ cursor: 'pointer' }} onClick={() => window.open(link, '_blank', 'noreferrer')}>
        <p>{description}</p>
        <br></br>
        <div className="bottomInfo" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Tag>{type}</Tag>
          <p>{contributor}</p>
        </div>
      </Panel>
    </div>
  );
}


