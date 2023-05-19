import './App.css';
import "rsuite/dist/rsuite.min.css";
import { Navbar, Nav} from 'rsuite';
import { useState } from 'react';
import { Resources } from './Resources';
import { Contribute } from './Contribute';
import { Contact } from './Contact';



function App() {
  const [page, setPage] = useState("Resources");

  return (
    <>
    <Navbar>
      <Navbar.Brand href="#"><img id="logo" src="logo2.png"/></Navbar.Brand>
      <Nav>
        <Nav.Item onClick={() => setPage("Resources")}>Resources</Nav.Item>
        <Nav.Item onClick={() => setPage("Contribute")}>Contribute</Nav.Item>
        <Nav.Item onClick={() => setPage("Contact")}>Contact</Nav.Item>
      </Nav>
      <Nav pullRight>
        <Nav.Item>Login</Nav.Item>
      </Nav>
    </Navbar>

    {page === "Resources" ? <Resources/>: <div></div>}
    {page === "Contribute" ? <Contribute/>: <div></div>}
    {page === "Contact" ? <Contact/>: <div></div>}

    </>
    
  );
}

export default App;
