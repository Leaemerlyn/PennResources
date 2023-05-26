import './App.css';
import "rsuite/dist/rsuite.min.css";
import { Navbar, Nav, Button} from 'rsuite';
import { useState } from 'react';
import { Resources } from './Resources';
import { Contribute } from './Contribute';
import { MyContributions } from './MyContributions';
import { Contact } from './Contact';
import { signInWithPopup, signOut} from "firebase/auth"
import { auth, googleProvider} from "./config/firebase"
import NavItem from 'rsuite/esm/Nav/NavItem';


function App() {
  const [page, setPage] = useState("Resources");
  const [loggedIn, setLoggedIn] = useState(false);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth,googleProvider);
      setLoggedIn(true);
    } catch (err){
      console.error(err);
    }
  }

  const signOut = async () => {
    try {
      await signOut(auth);
      setLoggedIn(false);
    } catch (err){
      console.error(err);
    }
  }

  return (
    <>
    <Navbar>
      <Navbar.Brand href="#"><img id="logo" src="logo.png" alt="logo"/></Navbar.Brand>
      <Nav>
        <Nav.Item onClick={() => setPage("Resources")} active>Resources</Nav.Item>
        <Nav.Item onClick={() => setPage("Contact")}>Contact</Nav.Item>
      </Nav>
      <Nav pullRight>
        {loggedIn ?
        <Nav.Menu title={auth?.currentUser?.displayName}>
          <Nav.Item onClick={() => setPage("My-Contributions")}>My Contributions</Nav.Item>
          <Nav.Item onClick={signOut}>Logout</Nav.Item>
        </Nav.Menu> :
        <Nav.Item onClick={signInWithGoogle}>Login</Nav.Item>
        }
      </Nav>
    </Navbar>

    {page === "Resources" ? <Resources/>: <div></div>}
    {page === "My-Contributions" ? <MyContributions/>: <div></div>}
    {page === "Contact" ? <Contact/> : <div></div>}
    </>
    
  );
}

export default App;
