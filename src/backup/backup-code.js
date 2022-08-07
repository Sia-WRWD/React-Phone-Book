<Router>
  <Routes>
    <Route index element={<Landing />}></Route>
    <Route exact path="/view-contact" element={<Contact_List />}></Route>
    <Route exact path="/add-contact" element={<Add_Contact />}></Route>
  </Routes>
</Router>; //Setup Router

<button className="action-btn">
<Link to="view-contact">View Contacts</Link>
</button>
<button className="action-btn">
<Link to="add-contact">Add New Contacts</Link>
</button> //Button to Redirect

<img src={logo} className="App-logo" alt="logo" /> //Logo



