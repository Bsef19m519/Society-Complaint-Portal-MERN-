import React  , {useState , useRef } from "react";
import { useNavigate } from 'react-router-dom';
import ScreenBtn from "../components/Button/ScreenButton";


const UpdateAdmin = () =>{

   let navigate = useNavigate();
   const sAdminHomePage = () => {
      navigate("/super-adminfp")
   }
 
   const nameRef = useRef(null);
   const passwordRef = useRef(null);
   const phoneRef = useRef(null);

   const [userInputs ,setUserInputs] = useState({
    name: '',
    email: '',
    phone:'',
    password:''
   })

   function nameHandler(event){
     setUserInputs({
        ...userInputs,
        name: event.target.value
     })
   }
   function emailHandler(event){
    setUserInputs({
        ...userInputs,
        email: event.target.value
     })
   }
   function phoneHandler(event){
    setUserInputs({
        ...userInputs,
        phone: event.target.value
     })
   }
   function passwordHandler(event){
    setUserInputs({
        ...userInputs,
        password: event.target.value
     })
   }

   function submitHandler(event){
    event.preventDefault();

    if(nameRef.current.value.trim() === ""){
        alert("please fill the name field ");
        return false;
    }
    
    else if (phoneRef.current.value.length < 11){
        alert("length must be atleast of 11 characters");
        return false;
    }

    else if (passwordRef.current.value.length < 8){
        alert("length must be atleast of 8 characters");
        return false;
    }
    
    console.log(userInputs);
    setUserInputs({
        name:'',
        email:'',
        phone:'',
        password:''
    })
   }

    return(
        <div>
        <form onSubmit={submitHandler}>
          <div>
            
          <div>
            <label>Name:</label><br/>
            <input type="text" name="adminName" ref={nameRef} value={userInputs.name} onChange={nameHandler}  autoFocus/>
            
          </div>
          <div>
            <label>Email:</label><br/>
            <input type="email" name="adminEmail" value={userInputs.email} onChange={emailHandler} />
            
          </div>
          <div>
            <label>Phone:</label><br/>
            <input type="number" ref={phoneRef} name="adminPhone" value={userInputs.phone} onChange={phoneHandler} />
            
          </div>
          <div>
            <label>Password:</label><br/>
            <input type="password" ref={passwordRef} name="adminPassword" value={userInputs.password} onChange={passwordHandler}/>
            
          </div>
          <div>
            <ScreenBtn type="submit" >Add Admin</ScreenBtn>
            <ScreenBtn type="button" onClick={sAdminHomePage} >Go Back</ScreenBtn>
          </div>
          </div>
        </form>
      </div>
    );
}

export default UpdateAdmin;
