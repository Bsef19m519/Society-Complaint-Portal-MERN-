import React from "react";
import "./Home.css";
import complaint from "./complaint4.jpg"

const Home = () => {
    return(
        <>
        <div className="homeDiv">
            <p className="homePara"><b><i>Society Complaint Portal</i></b> is a FCIT-student's owned Complaint Portal which is basically a website that runs on both desktops and mobiles. It is a tool where the residence of a society can registered their complaint against the other residence of the society. A person can register the complaint anonymously. Actions will be taken on the complaint within a week and if they are not taken, the admins would be punished accordingly.</p>
            <img className = "complaintPic" src = {complaint} alt = "complaint pic"/>
        </div>
        
        </>
    );
}

export default Home;