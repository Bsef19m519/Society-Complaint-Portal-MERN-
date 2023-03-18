import React , {useState } from "react";
import ScreenBtn from "../components/Button/ScreenButton";
import { useNavigate } from "react-router-dom";

const ViewAdmin = () =>{

//navigate to other component
    let navigate = useNavigate();
   const sAdminHomePage = () => {
      navigate("/super-adminfp")
   }

//managing input states   
    const [email , setEmail] = useState('');
    function emailHandler(event){
        event.preventDefalt();
        setEmail(event.target.value)
    }

    return(
        <div>
            <form>
            <div>
                <label>Email:</label><br/>
                <input type="email" name="adminEmail" value={email} onChange={emailHandler} required autoFocus/>
                <ScreenBtn type="submit">Search Admin</ScreenBtn>
                <ScreenBtn type="button" onClick={sAdminHomePage} >Go Back</ScreenBtn>
          </div>
            </form>
        </div>
    );
}

export default ViewAdmin;