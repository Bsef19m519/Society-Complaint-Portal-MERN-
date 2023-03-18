import React from "react";
import S1 from './services1.png'
import S2 from './services2.png'
import S3 from './services3.png'
import './Services.css'
const Service = () => {
    return(
        <>
        <h1 className="s-txt">Services We Provide</h1>
   <div className="servicesDiv">
    
       <div className="service-Div">
         <img className = "serviceImg"  src={S1} alt = "pic"/>
         <p className="service-txt">Get to know the status of your complaint.</p>
       </div>
       <div className="service-Div">
         <img className = "serviceImg"  src={S3} alt = "pic"/>
         <p className="service-txt">Search and keep the track on your complaint.</p>
       </div>
       <div className="service-Div">
         <img className = "serviceImg"  src={S2} alt = "pic"/>
         <p className="service-txt">Register complaint against the people who bother you.</p>
       </div>
   </div>
   </>
    );
}

export default Service;