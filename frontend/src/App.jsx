import { Fragment } from "react";
import Home from "./components/home";
import './assets/styles/style.css'
import Nav from "./components/navbar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Form from "./components/form.jsx";
import Employee from "./components/employee.jsx";
import Update_Form from "./components/update_form.jsx";

function App(){
  return(
    <Fragment>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/employee/:id" Component={Employee}/>
          <Route path="/update/:id" Component={Update_Form}/>
          <Route path="/register" Component={Form}/>
        </Routes>
      </Router>
    </Fragment>
  )
}

export default App