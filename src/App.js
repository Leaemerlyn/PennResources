import './App.css';
import "rsuite/dist/rsuite.min.css";
import { Navbar, Nav, Notification, useToaster } from 'rsuite';
import { useState } from 'react';
import { Resources } from './pages/Resources';
import { Contribute } from './pages/Contribute';
import { MyContributions } from './pages/MyContributions';
import { Contact } from './pages/Contact';
import { signInWithPopup, signOut} from "firebase/auth"
import { auth, googleProvider } from "./config/firebase"
import NavItem from 'rsuite/esm/Nav/NavItem';
import { Welcome } from './components/Welcome';


function App() {
  const [page, setPage] = useState("Resources");
  const [loggedIn, setLoggedIn] = useState(false);

  const toaster = useToaster();

  const signOutSuccess = (
    <Notification type={"success"} header={"Success"}>
        <p>You have successfully logged out.</p>
    </Notification>
);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth,googleProvider);
      setLoggedIn(true);
    } catch (err){
      console.log(err);
    }
  }

  const signOutOfAccount = async () => {
    try {
      await signOut(auth);
      setLoggedIn(false);
      setPage("Resources");
      toaster.push(signOutSuccess, {duration: 3000});
    } catch (err){
      console.log(err);
    }
  }

  return (
    <>
    <Navbar>
      <Navbar.Brand href="#"><img id="logo" src="logo.png" alt="logo"/></Navbar.Brand>
      <Nav>
        <Nav.Item onClick={() => setPage("Resources")}>Resources</Nav.Item>
        <Nav.Item onClick={() => setPage("Contact")}>Contact</Nav.Item>
      </Nav>
      <Nav pullRight>
        {loggedIn ?
        <Nav.Menu title={auth?.currentUser?.displayName}>
          <Nav.Item onClick={() => setPage("My-Contributions")}>My Contributions</Nav.Item>
          <Nav.Item onClick={signOutOfAccount}>Logout</Nav.Item>
        </Nav.Menu> :
        <Nav.Item onClick={signInWithGoogle}>Login</Nav.Item>
        }
      </Nav>
    </Navbar>

    {page === "Resources" ? <Resources loggedIn={loggedIn} />: <div></div>}
    {page === "My-Contributions" ? <MyContributions loggedIn={loggedIn}/>: <div></div>}
    {page === "Contact" ? <Contact/> : <div></div>}
    </>
    
  );
}

export default App;
