import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../images/Ultraverse.png';

const Nav = () => {
  return (
    <header className="nav-header">
      <div className="nav-bar-container">
        
        {/* Left Group */}
        <div className="nav-left-group">
          <Link to="/">
            <img src={Logo} alt="Ultraverse Logo" className="h-8 object-contain" />
          </Link>

          <div className="nav-search-wrapper">
            <input
              type="text"
              placeholder="search item here..."
              className="nav-search-input"
            />
          </div>
        </div>

        {/* Right Group */}
        <div className="nav-right-group">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/explore" className="nav-link">
            Explore
          </Link>
          <button className="wallet-btn">
            Connect wallet
          </button>
        </div>

      </div>
    </header>
  );
};

export default Nav;