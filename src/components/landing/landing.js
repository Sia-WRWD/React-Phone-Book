//Libraries
import React from "react";

//Components
import ContactList from "../contact_list/contact_list";

//Other Assets
import "./landing.css";

function landingPage() {
  return (
    <header className="App-header">
      <h1 className="App-Title">
        <p className="blast big">📞</p>
        <p className="blast">B</p>
        <p className="blast">O</p>
        <p className="blast">O</p>
        <p className="blast">K</p>
      </h1>
      {<ContactList />}
    </header>
  );
}

export default landingPage;
