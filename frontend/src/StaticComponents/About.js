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
          </b>{" "}
          is a FCIT-student's owned Complaint Portal which is basically a
          website that runs on desktop. It is a tool where the residents of a
          society can registered their complaint against the other resident of
          the society or against any issue they are facing. A person can
          register the complaint anonymously. Actions will be taken on the
          complaint within a specific period. The goal is to build a software
          efficient enough to handle complaints online without any
          inconsistency.There are three end-users of this system named Admin,
          Complaint Officer and Resident of the society.
          <br />
          <br /> Our goal is that by using this software resident can register
          complaints, track complaints, admin will manage the residents.
          Complaint officer will track the complaint. Based on facts and
          reality, officer will acknowledged , resolve or reject the complaint.
          Register Complaint, Track Complaint, Complaint status, Generate PDF of
          complaints are the services provided by this portal.
        </p>
        <p></p>
      </div>
    </>
  );
};

export default About;
