import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import "./Navbar.scss";

const navbar = ({navigate, handleLogOut, name }) => {
  return (
    <Navbar className="navbar" variant="dark">
      <Container>
        <Navbar.Brand className="brand-name">Budget Visualiser</Navbar.Brand>
        <Nav>
          <Nav.Link className="home" onClick={() => navigate("home")}>Home</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link className="transactions" onClick={() => navigate("transactions")}>Transactions</Nav.Link>
        </Nav>
        <Nav className="me-auto">
          <Nav.Link className="goals" onClick={() => navigate("goals")}>Goals</Nav.Link>
        </Nav>
        <div className="badge">{name}</div>
        <Button onClick={handleLogOut} variant="light">
          Log out
        </Button>
      </Container>
    </Navbar>
  );
};

export default navbar;
