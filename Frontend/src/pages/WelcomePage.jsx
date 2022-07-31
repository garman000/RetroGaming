import React, { useContext, useState } from "react";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import AuthContext from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "./welcomePage.css";
import AuthModal from "../components/AuthModal";

function WelcomePage() {
  const { onLogin } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isLoginError, setIsLoginError] = useState(false);
  const navigate = useNavigate();

  async function handleLogin() {
    setIsLoginError(false);
    setIsLoggingIn(true);
    try {
      await onLogin(email, pwd);
      navigate("/home");
    } catch (err) {
      setIsLoginError(err.response.data.message);
    } finally {
      setIsLoggingIn(false);
    }
  }

  return (
    <div id="welcome-page">
      <div id="left-side">
        <img src={require("../images/retro-gaming.jpg")} />
      </div>
      <div id="right-side">
        <Form id="form">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={{ color: "white" }}>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label style={{ color: "white" }}>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
            />
          </Form.Group>
          {isLoginError && <Alert variant="danger">{isLoginError}</Alert>}
          <Button
            variant="outline-primary"
            type="button"
            onClick={handleLogin}
            disabled={isLoggingIn}
          >
            Login with email & password{" "}
            {isLoggingIn && <Spinner animation="border" size="sm" />}
          </Button>
          - or-
          <Button
            variant="outline-primary"
            type="button"
            onClick={() => setShowModal(true)}
          >
            Create a new account
          </Button>
        </Form>
        <AuthModal show={showModal} onClose={() => setShowModal(false)} />
      </div>
    </div>
  );
}

export default WelcomePage;
