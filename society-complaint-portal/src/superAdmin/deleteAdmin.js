import React , {useState } from "react";
import ScreenBtn from "../components/Button/ScreenButton";
import { useNavigate } from "react-router-dom";

const DeleteAdmin = () =>{


//navigate to others component
   let navigate = useNavigate();
   const sAdminHomePage = () => {
      navigate("/super-adminfp")
   }

   //handling input state
    const [email , setEmail] = useState('');
    function emailHandler(event){
        event.preventDefault();
        setEmail(event.target.value)
    }

    return(
        <div>
            <form>
            <div>
                <label>Email:</label><br/>
                <input type="email" name="adminEmail" value={email} onChange={emailHandler} required autoFocus/>
                <ScreenBtn type="submit">Delete Admin</ScreenBtn>
                <ScreenBtn type="button" onClick={sAdminHomePage} >Go Back</ScreenBtn>
          </div>
            </form>
        </div>
    );
}

export default DeleteAdmin;