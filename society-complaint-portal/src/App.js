 import './App.css';
import Login from './components/Login';
import Header from './components/Header';
import Home from './StaticComponents/Home';
import About from './StaticComponents/About';
import Contact from './StaticComponents/Contact';
 import AddNewComplaint from './components/Residents/AddComplaint';
 import FrontPage from './components/FrontPage';
 import ViewComplaint from './components/Residents/ViewComplaint';
 import Service from './StaticComponents/Service';
 import AddAdmin from './superAdmin/addAdmin';
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import SAFrontPage from './superAdmin/superAdminFrontPage';
import UpdateAdmin from './superAdmin/updateAdmin';
import ViewAdmin from './superAdmin/searchAdmin';
import DeleteAdmin from './superAdmin/deleteAdmin';

 function App() {
   return(
       <div className='App-header'> 
        <Router>
        <Header/>
          <Routes>
            <Route path='/' element = {<Home/>}></Route>
          </Routes>
          <Routes>
            <Route path='/about' element = {<About/>}></Route>
          </Routes>
          <Routes>
            <Route path='/contact' element = {<Contact/>}></Route>
          </Routes>
          <Routes>
            <Route path='/service' element = {<Service/>}></Route>
          </Routes>
          <Routes>
            <Route path='/login' element = {<Login/> }></Route>
          </Routes>
          <Routes>
            <Route path='/register-complaint' element = {<AddNewComplaint/> }></Route>
          </Routes> 
           <Routes>
            <Route path='/front-page' element = {<FrontPage/> }></Route>
          </Routes> 
          <Routes>
            <Route path='/view-complaint' element = {<ViewComplaint/>}></Route>
          </Routes> 
          <Routes>
            <Route path='/super-adminfp' element = {<SAFrontPage/>}></Route>
          </Routes>
          <Routes>
            <Route path='/add-admin' element = {<AddAdmin/>}></Route>
          </Routes>
          <Routes>
            <Route path='/update-admin' element = {<UpdateAdmin/>}></Route>
          </Routes>
          <Routes>
            <Route path='/view-admin' element = {<ViewAdmin/>}></Route>
          </Routes>
          <Routes>
            <Route path='/delete-admin' element = {<DeleteAdmin/>}></Route>
          </Routes>
       </Router>
      </div>
     );
  
}

 export default App;
