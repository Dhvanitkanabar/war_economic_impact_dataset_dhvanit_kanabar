import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const getLinkClass = (path, isButton = false) => {
    let baseClass = 'nav-link';
    if (isButton) {
      baseClass += ' login-btn';
    }
    return currentPath === path ? `${baseClass} active` : baseClass;
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">
        War<span>Lens</span>
      </Link>
      
      <ul className="nav-links">
        <li>
          <Link to="/" className={getLinkClass('/')}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/conflicts" className={getLinkClass('/conflicts')}>
            Conflicts
          </Link>
        </li>
        <li>
          <Link to="/statistics" className={getLinkClass('/statistics')}>
            Statistics
          </Link>
        </li>
        <li>
          <Link to="/analytics" className={getLinkClass('/analytics')}>
            Analytics
          </Link>
        </li>
        <li>
          <Link to="/login" className={getLinkClass('/login', true)}>
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
