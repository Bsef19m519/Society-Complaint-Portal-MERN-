import React from "react";
import './Header.css';
import logo from './logo.png';
import {Link} from 'react-router-dom';
import ScreenBtn from "./Button/ScreenButton";


// import FrontPage from "./FrontPage";
// import Login from "./Login";

const Header = () => {
    return(
       
    <header>
            <div className="logo">
                <img src={logo} alt="Logo"/>
            </div>
            <nav>

              
                <ul>
                    <li><Link to="/" className='linkStyle'>Home</Link></li>
                    <li> <Link to="/about" className='linkStyle'>About</Link></li>
                    <li><Link to="/service" className='linkStyle'>Services</Link></li>
                    <li> <Link to="/contact" className='linkStyle'>Contact</Link></li>
                    <li><Link to="/login"><ScreenBtn type="button">Sign In</ScreenBtn></Link></li>
                </ul> 
            </nav>
           
                 
            
    </header>
    
    );
}
export default Header;
