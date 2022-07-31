import React, { useContext, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import AuthContext from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function SignUp({ closeModal }) {
  const { onSignUp } = useContext(AuthContext);
  const [firstName, setFirstName] = useState("");
  const [nickName, setnickName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPwd] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signUpErr, setSignUpErr] = useState("");
  const navigate = useNavigate();

  async function onSignUpWrapper() {
    if (
      !firstName ||
      !lastName ||
      !nickName ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      setSignUpErr("Missing information - all fields must be filled.");
      return;
    }
    if (password != confirmPassword) {
      setSignUpErr("Passwords don't match");
      return;
    }
    try {
      const response = await onSignUp({
        first_name: firstName,
        last_name: lastName,
        nickname: nickName,
        email,
        password,
      });
      if (response.status === "ok") {
        navigate("/home");
        closeModal();
      }
    } catch (err) {
      setSignUpErr(err.response.data.message);
    }
  }

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>NickName</Form.Label>
        <Form.Control
          type="name"
          placeholder="Enter a NickName"
          value={nickName}
          onChange={(e) => setnickName(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="name"
          placeholder="Enter first name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="name"
          placeholder="Enter last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email Address</Form.Label>
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
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPwd(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password Confirmation</Form.Label>
        <Form.Control
          type="password"
          placeholder="Re-type your Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </Form.Group>
      {signUpErr && <Alert variant="danger">{signUpErr}</Alert>}
      <Button variant="outline-primary" type="button" onClick={onSignUpWrapper}>
        Create Account
      </Button>
    </Form>
  );
}

export default SignUp;
