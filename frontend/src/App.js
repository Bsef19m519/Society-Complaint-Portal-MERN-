import "./App.css";
import Login from "./components/Login/Login";
import Header from "./components/Header/Header";
import Home from "./StaticComponents/Home";
import About from "./StaticComponents/About";
import AddNewComplaint from "./Residents/AddComplaint";
import FrontPage from "./Residents/FrontPageResidents/FrontPage";
import ViewComplaint from "./Residents/ViewComplaint";
import Service from "./StaticComponents/Service";
import AddResident from "./Resident Component/addResident";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // useLocation,
} from "react-router-dom";
import SAFrontPage from "./Resident Component/ResidentFrontPage";
import UpdateResident from "./Resident Component/updateResident";
import ViewResident from "./Resident Component/searchResident";
import DeleteResident from "./Resident Component/deleteResident";
import ComplaintOfficer from "./Resident Component/ComplaintOfficer";
import { useRef } from "react";
// import { useLocation } from "react-router-dom";

function App() {
  const aboutRef = useRef();
  const serviceRef = useRef();
  // const location = useLocation();

  const goAbout = (section) => {
    if (section === "about") {
      aboutRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    } else {
      serviceRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  };

  return (
    <div className="App-header">
      <Router>
        <Header goAbout={goAbout} />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/service" element={<Service />}></Route>
          <Route path="/login" element={<Login />}></Route>

          <Route
            path="/register-complaint"
            element={<AddNewComplaint />}
          ></Route>
          <Route path="/Resident-front-page" element={<FrontPage />}></Route>
          <Route path="/view-complaint" element={<ViewComplaint />}></Route>
          <Route path="/Admin-front-page" element={<SAFrontPage />}></Route>
          <Route path="/add-resident" element={<AddResident />}></Route>
          <Route path="/update-resident" element={<UpdateResident />}></Route>
          <Route path="/view-resident" element={<ViewResident />}></Route>
          <Route path="/Officer" element={<ComplaintOfficer />}></Route>
          <Route path="/delete-resident" element={<DeleteResident />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
