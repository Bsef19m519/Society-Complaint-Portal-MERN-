import React from 'react';
import './Footer.css';
import {Link} from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; Society Complaint Portal</p>
      <nav>
        <ul>
          <li><Link to="/" className='linkStyle'>Home</Link></li>
          <li><Link to="/about" className='linkStyle'>About</Link></li>
          <li><Link to="/service" className='linkStyle'>Services</Link></li>
        </ul>
      </nav>
    </footer>
  );
}

export default Footer;
