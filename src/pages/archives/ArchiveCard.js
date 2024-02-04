import React from 'react';
import { Link } from 'react-router-dom';
import './archive.css'; // Import external CSS


const ArchiveCard = ({ title, count, to,desc,logo }) => {
  return (
    <div className="card-container">
      <Link to={to} className="card-link">
        <div className="archive-avatar">
          <img
            src={logo}
            alt="Avatar"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <div className="text-container">
          <div className="text-content">
            <h3>{title}</h3>
            <>({count}) {desc}</>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ArchiveCard;
