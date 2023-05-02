import React from "react";
import S1 from "./services1.png";
import S2 from "./services2.png";
import S3 from "./services3.png";
import S4 from "./notificationalert.png";
import S5 from "./alert.png";
import S6 from "./penalty.png";
import "./Services.css";
// import Img from "./landingPage1.jpeg";
const Service = ({ serviceRef }) => {
  return (
    <div ref={serviceRef} id="admin-service">
      <h1 className="s-txt">Services We Provide</h1>
      <div className="wrapperDiv">
        <div className="servicesDiv">
          <div className="service-Div">
            <img className="serviceImg" src={S2} alt="pic" />
            <h3>Register Complaint</h3>
            <p className="service-txt">
              Register complaint against the people who bother you. Complaint
              will be anonymous to complainee.{" "}
            </p>
          </div>

          <div className="service-Div">
            <img className="serviceImg" src={S3} alt="pic" />
            <h3>Track Complaint</h3>
            <p className="service-txt">
              Search and keep the track on your complaint. Check your previously
              registered complaints records.
            </p>
          </div>

          <div className="service-Div">
            <img className="serviceImg" src={S1} alt="pic" />
            <h3> Complaint Status</h3>
            <p className="service-txt">
              Get to know the status of your complaint. Check the status of your
              complaint whether it is in process or not.
            </p>
          </div>
        </div>
        <div className="servicesDiv">
          <div className="service-Div">
            <img className="serviceImg" src={S4} alt="pic" />
            <h3>Notifications</h3>
            <p className="service-txt">
              Register complaint against the people who bother you. Complaint
              will be anonymous to complainee.{" "}
            </p>
          </div>

          <div className="service-Div">
            <img className="serviceImg" src={S5} alt="pic" />
            <h3>Alert/Warning</h3>
            <p className="service-txt">
              Search and keep the track on your complaint. Check your previously
              registered complaints records.
            </p>
          </div>

          <div className="service-Div">
            <img className="serviceImg" src={S6} alt="pic" />
            <h3> Penalty</h3>
            <p className="service-txt">
              Get to know the status of your complaint. Check the status of your
              complaint whether it is in process or not.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
