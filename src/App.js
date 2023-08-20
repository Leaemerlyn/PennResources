import './App.css';
import "rsuite/dist/rsuite.min.css";
import { Navbar, Nav, Notification, useToaster } from 'rsuite';
import { useState, useEffect } from 'react';
import { Resources } from './pages/Resources';
import { MyContributions } from './pages/MyContributions';
import { Contact } from './pages/Contact';
import { signInWithPopup, signOut} from "firebase/auth"
import { auth, googleProvider } from "./config/firebase"
import { setSignOutKey, setSignInKey } from './popUpKey';

function App() {
  const [page, setPage] = useState("Resources");
  const [loggedIn, setLoggedIn] = useState(false);
  
  const toaster = useToaster();

  const signOutSuccess = (
    <Notification type={"success"} header={"Success"}>
        <p>You have successfully logged out.</p>
    </Notification>
  );

  const signInSuccess = (
    <Notification type={"success"} header={"Success"}>
        <p>You have successfully logged in.</p>
    </Notification>
  );

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth,googleProvider);
      setSignInKey(toaster.push(signInSuccess, {duration: 3000}));
      setLoggedIn(true);
    } catch (err){
      console.log(err);
    }
  }

  const signOutOfAccount = async () => {
    try {
      await signOut(auth);
      setSignOutKey(toaster.push(signOutSuccess, {duration: 3000}));
      setLoggedIn(false);
      setPage("Resources");
    } catch (err){
      console.log(err);
    }
  }

  return (
    <>
    <Navbar>
      <Navbar.Brand onClick={() => setPage("Resources")}><img id="logo" src="logo.png" alt="logo"/></Navbar.Brand>
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

    {page === "Resources" ? <Resources loggedIn={loggedIn} page={page} />: <div></div>}
    {page === "My-Contributions" ? <MyContributions loggedIn={loggedIn} />: <div></div>}
    {page === "Contact" ? <Contact page={page} /> : <div></div>}
    </>
    
  );
}

export default App;
