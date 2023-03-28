import "./App.css";
import Login from "./components/Login/Login";
import Header from "./components/Header/Header";
import Home from "./StaticComponents/Home";
import About from "./StaticComponents/About";
import AddNewComplaint from "./Residents/AddComplaint";
import FrontPage from "./Residents/FrontPageResidents/FrontPage";
import ViewComplaint from "./Residents/ViewComplaint";
import Service from "./StaticComponents/Service";
import AddAdmin from "./superAdmin/addAdmin";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // useLocation,
} from "react-router-dom";
import SAFrontPage from "./superAdmin/superAdminFrontPage";
import UpdateAdmin from "./superAdmin/updateAdmin";
import ViewAdmin from "./superAdmin/searchAdmin";
import DeleteAdmin from "./superAdmin/deleteAdmin";
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
          <Route path="/front-page" element={<FrontPage />}></Route>
          <Route path="/view-complaint" element={<ViewComplaint />}></Route>
          <Route path="/super-adminfp" element={<SAFrontPage />}></Route>
          <Route path="/add-admin" element={<AddAdmin />}></Route>
          <Route path="/update-admin" element={<UpdateAdmin />}></Route>
          <Route path="/view-admin" element={<ViewAdmin />}></Route>
          <Route path="/delete-admin" element={<DeleteAdmin />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
