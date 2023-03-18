import React from 'react';
import './FrontPage.css'
import ScreenBtn from './Button/ScreenButton';
import { useNavigate } from 'react-router-dom';

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
        <div className='btnDiv'>
            <h1 className='fp-txt'>Welcome To Society Complaint Portal</h1>
                <div className='btn'>
                    <ScreenBtn type="button" onClick = {regsterNewComplaint}>Register Complaint</ScreenBtn>
                    <ScreenBtn type="button" onClick = {viewComplaint}>View Complaint</ScreenBtn>
                    <ScreenBtn type="button">Notfications</ScreenBtn>
            </div>
        </div>
        
    );
}

export default FrontPage;