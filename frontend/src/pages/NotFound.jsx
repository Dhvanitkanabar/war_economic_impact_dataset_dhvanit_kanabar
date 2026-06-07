import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="page-container">
      <div className="page-card">
        <div className="notfound-code">404</div>
        <h1 className="page-title">Page Not Found</h1>
        <p className="page-desc">The page you are looking for does not exist.</p>
        <Link to="/" className="back-home-btn">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
