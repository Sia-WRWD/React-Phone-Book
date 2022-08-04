//Libraries
import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Components
import Contact_List from "./components/contact_list/contact_list";
import Add_Contact from "./components/add_contact/add_contact";
import Landing from "./components/landing/landing";

//Other Assets
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Routes>
            <Route index element={<Landing />}></Route>
            <Route
              exact
              path="/view-contact"
              element={<Contact_List />}
            ></Route>
            <Route exact path="/add-contact" element={<Add_Contact />}></Route>
          </Routes>
        </Router>
        <footer className="App-footer">
          <a href="https://heysia.dev">
            Built and Designed by Sia <br /> All rights reserved. ©
          </a>
        </footer>
      </div>
    );
  }
}

export default App;
