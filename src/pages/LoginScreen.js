import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import Loader from "../components/Loader";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useAuth } from "../contexts/AuthContext";
import { FcGoogle } from 'react-icons/fc';

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const { login, currentUser, loginWithGoogle } = useAuth();
 
  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      // history.push('/');
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
      <h1 className="fs-4">Login</h1>
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

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      <hr />

      <Button variant="secondary" onClick={loginWithGoogle}>
        <FcGoogle/>  Login with Google
      </Button>

    </>
  );
}

export default LoginScreen;
