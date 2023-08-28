import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./LoginForm.scss";

const loginForm = ({
  username,
  password,
  changeUsername,
  changePassword,
  handleLogin,
  handleRegister,
}) => {
  return (
    <Form onSubmit={handleLogin} className="login-form">
      <Form.Group className="mb-3 username" controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={changeUsername}
        />
      </Form.Group>
      <Form.Group className="mb-3 password" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          className="password"
          type="password"
          autoComplete="on"
          placeholder="Password"
          value={password}
          onChange={changePassword}
        />
      </Form.Group>
      <div className="buttons">
        <Button
          variant="secondary"
          onClick={handleRegister}
          className="register-button"
        >
          Register
        </Button>
        <Button variant="primary" type="submit" className="login-button">
          Log in
        </Button>
      </div>
    </Form>
  );
};

export default loginForm;
