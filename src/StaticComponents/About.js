import React from "react";
import "./About.css";

const About = ({ aboutRef }) => {
  return (
    <>
      <div className="headingDiv" ref={aboutRef}>
        {/* <h1>Online Complaint <br/> Management System</h1> */}
        <h1>Society Complaint Portal </h1>
        <p className="smallPara">Online Complaint Management System</p>
      </div>
      <div className="paraDiv">
        <p className="aboutPara">
          <b>
            <i>Society Complaint Portal</i>
          </b>
          is a FCIT-student's owned Complaint Portal which is basically a
          website that runs on desktop. It is a tool where the residents of a
          society can registered their complaint against the other resident of
          the society. A person can register the complaint anonymously. Actions
          will be taken on the complaint within a week and if they are not
          taken, the admins would be punished accordingly. The goal is to build
          a software efficient enough to handle complaints online without any
          inconsistency.There are three end-users of this system named super
          Admin , Admin and Resident of the society.
          <br />
          <br /> Our goal is that by using this software resident can register
          complaints, track complaints, get a penalty when registering a false
          complaint, admin tackle complaints within a specified period.There
          will be multiple admins and each admin will handle complaints .They
          will be under observations by Super Admin and incase of delay that
          particular admin get a penalty from super admin.Super admin can
          add,delete,view and update admins , Whereas the Complainee will got
          warning or penalty according to the case .
        </p>
        <p></p>
      </div>
    </>
  );
};

export default About;
