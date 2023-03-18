import React from 'react';
import ScreenBtn from '../components/Button/ScreenButton';
import { useNavigate } from 'react-router-dom';


const SAFrontPage = () => {

   let navigate = useNavigate();
   let navigate2 = useNavigate();
   let navigate3 = useNavigate();
   let navigate4 = useNavigate();

   const addNewAdmin = () => {
      navigate("/add-admin");
   }
   
   const viewAdmin = () => {
    navigate2("/view-admin");
 }

 const updateAdmin = () => {
    navigate3("/update-admin");
 }

 const deleteAdmin = () => {
    navigate4("/delete-admin");
 }

    return(
        <div >
            <h1 className='fp-txt'>Welcome To Society Complaint Portal</h1>
                <div>
                    <ScreenBtn type="button" onClick = {addNewAdmin}>Add NEW Admin</ScreenBtn>
                    <ScreenBtn type="button" onClick = {viewAdmin}>View Admin</ScreenBtn>
                    <ScreenBtn type="button" onClick = {updateAdmin}>Update Admin</ScreenBtn>
                    <ScreenBtn type="button" onClick = {deleteAdmin}>Delete Admin</ScreenBtn>
                    
            </div>
        </div>
        
    );
}

export default SAFrontPage;