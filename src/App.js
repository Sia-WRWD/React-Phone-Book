import logo from "./assets/phone.gif";
import "./App.css";

function App() {
  return (
    <div className="App">
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
        <button className="action-btn">View Contacts</button>
        <button className="action-btn">Add New Contacts</button>
      </header>
      <footer className="App-footer">
        <a href="https://heysia.dev">
          Built and Designed by Sia <br></br> All rights reserved. ©
        </a>
      </footer>
    </div>
  );
}

export default App;
