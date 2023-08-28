import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./RegisterForm.scss";

const registerForm = ({
  name,
  username,
  password,
  changeName,
  changeUsername,
  changePassword,
  handleRegister,
  handleCancel,
}) => {
  return (
    <Form onSubmit={handleRegister} className="register-form">
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={changeName}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={changeUsername}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          autoComplete="on"
          placeholder="Password"
          value={password}
          onChange={changePassword}
        />
      </Form.Group>
      <div className="buttons">
        <Button
          variant="outline-danger"
          onClick={handleCancel}
          
        >
          Cancel
        </Button>
        <Button variant="success" type="submit" className="register-button">
          Register
        </Button>
      </div>
    </Form>
  );
};

export default registerForm;
