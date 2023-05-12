import './App.css';
import "rsuite/dist/rsuite.min.css";
import { Button, Navbar, Nav, Panel, Col, Row } from 'rsuite';
import PlaceholderParagraph from 'rsuite/esm/Placeholder/PlaceholderParagraph';


function App() {
  return (
    <>
    <Navbar>
      <Navbar.Brand href="#"><img id="logo" src="logo2.png"/></Navbar.Brand>
      <Nav>
        <Nav.Item>Resources</Nav.Item>
        <Nav.Item>Contribute</Nav.Item>
        <Nav.Item>Contact</Nav.Item>
      </Nav>
      <Nav pullRight>
        <Nav.Item>Login</Nav.Item>
      </Nav>
    </Navbar>
    <p> hello test</p>
    </>
    
  );
}

export default App;
