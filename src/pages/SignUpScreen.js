import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Loader from "../components/Loader";
import { useAuth } from "../contexts/AuthContext";


function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const { signup, currentUser } = useAuth();

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await signup(email, password);
      history.push('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      history.push('/');
    }
  }, [currentUser, history])

  return (
    <>
      <h1 className="fs-4">Sign Up</h1>
      {loading && <Loader />}
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            type="password"
            placeholder="Confirm Password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

export default SignUpScreen;
