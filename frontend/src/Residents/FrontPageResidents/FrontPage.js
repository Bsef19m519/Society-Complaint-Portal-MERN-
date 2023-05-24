import React from "react";
import StylishButton from '../../components/Button/StylishButtons';
import { useNavigate } from "react-router-dom";
import "./FrontPage.css";
import loginIcon from "../../components/Header/SCP3.png";

const FrontPage = () => {

   let navigate = useNavigate();
   let navigate2 = useNavigate();

   const regsterNewComplaint = () => {
      navigate("/register-complaint");
   }
   
   const viewComplaint = () => {
    navigate2("/view-complaint");
 }

    return(
    
            <div className="RcontainerDiv">
            <div className="R-content-container-div">
                 <img className="RloginIcon" src={loginIcon} alt="SCP pic" />
                 <h2 className="Rlogin-txt"> Welcome User</h2>
                 
            <div style={{ display: 'flex', gap: '10px' }}></div>
             <div className="R-screen-button-div">
              <StylishButton type="button" onClick={regsterNewComplaint}>
                Register complaint
             </StylishButton>
             
             <div style={{ display: 'flex', gap: '10px' }}></div>
              <StylishButton type="button" onClick={viewComplaint}>
                View complaint
              </StylishButton>
             </div>
              </div>
            </div>
        
    );
}

export default FrontPage;






