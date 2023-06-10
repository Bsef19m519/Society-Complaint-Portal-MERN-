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
    <>
      <div ref={serviceRef} id="admin-service">
        <h1 className="s-txt">Services We Provide</h1>
        <div className="wrapperDiv">
          <div className="servicesDiv">
            <div className="service-Div">
              <img className="serviceImg" src={S2} alt="pic" />
              <h3>Register Complaint</h3>
              <p className="service-txt">
                The "Register Complaint" provides residents with a
                straightforward way to voice their concerns and issues within
                the community. By accessing their resident account on the
                Society Complaint Portal, residents can utilize this to lodge a
                complaint regarding any problem they are facing. It plays a
                crucial role in ensuring that resident concerns are heard and
                addressed promptly.
              </p>
            </div>

            <div className="service-Div">
              <img className="serviceImg" src={S3} alt="pic" />
              <h3>Track Complaint</h3>
              <p className="service-txt">
                The "Track Complaint" provides residents with the ability to
                monitor and stay informed about the status of their registered
                complaints. Through this, residents can access real-time updates
                on the progress of their complaints, ensuring transparency and
                accountability in the complaint resolution process. It empowers
                residents by providing them with visibility and control over
                their registered complaints.
              </p>
            </div>

            <div className="service-Div">
              <img className="serviceImg" src={S1} alt="pic" />
              <h3> Complaint Status</h3>
              <p className="service-txt">
                The "Complaint Status" provides a comprehensive overview of all
                the complaints registered within the Society Complaint Portal.
                This allows us to efficiently manage and track the status of
                each complaint throughout the resolution process. It serves as a
                central hub for monitoring and managing the lifecycle of
                complaints, ensuring that each complaint receives proper
                attention and timely resolution.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Service;
