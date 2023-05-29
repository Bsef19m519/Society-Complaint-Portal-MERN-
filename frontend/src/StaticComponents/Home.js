import React from "react";
import "./Home.css";
import home5 from "./home5.jpg";
import About from "./About";
import Service from "./Service";
import Footer from "../components/Footer/Footer";
// import Header from "../components/Header/Header";
// import complaint from "./complaint4.jpg"

const Home = ({ aboutRef, serviceRef, goAbout }) => {
  return (
    <>
      {/* <Header /> */}
      <div className="homeDiv">
        <img className="complaintPic" src={home5} alt="home5 pic" />
      </div>
      <About aboutRef={aboutRef} />
      <Service serviceRef={serviceRef} />
      <Footer />
    </>
  );
};

export default Home;
