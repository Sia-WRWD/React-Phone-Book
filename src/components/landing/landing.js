//Libraries
import React from "react";
import { Link } from "react-router-dom";

//Components
import Contact_List from "../contact_list/contact_list";
import Add_Contact from "../add_contact/add_contact";
import Landing from "./landing";

//Other Assets
import logo from "../../assets/phone.gif";
import "./landing.css";

function landingPage() {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1>
        <p className="blast">W</p>
        <p className="blast">e</p>
        <p className="blast">l</p>
        <p className="blast">c</p>
        <p className="blast">o</p>
        <p className="blast">m</p>
        <p className="blast">e</p>
        &nbsp;
        <p className="blast">t</p>
        <p className="blast">o</p>
        &nbsp;
        <p className="blast">P</p>
        <p className="blast">-</p>
        <p className="blast">B</p>
        <p className="blast">o</p>
        <p className="blast">o</p>
        <p className="blast">k</p>
        <p className="blast">!</p>
      </h1>
      <button className="action-btn">
        <Link to="view-contact">View Contacts</Link>
      </button>
      <button className="action-btn">
        <Link to="add-contact">Add New Contacts</Link>
      </button>
    </header>
  );
}

export default landingPage;
