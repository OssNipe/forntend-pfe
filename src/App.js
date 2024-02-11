import * as React from 'react'
import "bootstrap/dist/css/bootstrap.css"
import {BrowserRouter as Router, Routes,Route,Link} from 'react-router-dom'

import EditTutor from "./components/edit.component";
import CreateTutor from "./components/create.component";
import TutorList from "./components/list.component";

function App() {
  return (
 <Router>

      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
        
          <Link to={"/"} className="navbar-brand">tutors</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
             
              <li className="nav-item">
                <Link className="nav-link active" to={"/Tutor/create"}>Create</Link>
              </li>  
            </ul> 
          </div>
        </div>
      </nav>

   <Routes>
        <Route path="/tutor/create" element={<CreateTutor />}></Route>
        <Route path="/tutor/edit/:id" element={<EditTutor />}></Route>
        <Route path="/" element={<TutorList />}></Route>
   </Routes>
 </Router>
  );
}

export default App;
