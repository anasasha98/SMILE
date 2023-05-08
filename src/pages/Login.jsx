import React, { useState, useEffect } from "react";
import Helmet from "../component/Helmet/Helmet";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Button } from "react-bootstrap";
import {auth} from '../firebase.config'
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from 'firebase/auth';
import "../styles/auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const signIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth , email , password)
      const user = userCredential.user
      console.log(user);
      setLoading(false);
      toast.success("successfully logged in");
      navigate("/checkout");
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Helmet title="Login">
      <section>
        <Container>
          <Row>
            {loading ? (
              <Col lg="12" className="text-center">
                <h5 className="fw-bold">Loading....</h5>{" "}
              </Col>
            ) : (
              <Col lg="6" className="m-auto text-center">
                <h3 className="fw-bold fs-4">Login</h3>
                <Form className="auth_form" onSubmit={signIn}>
                  <FormGroup className="form_group my-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className="form_group mb-5">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </FormGroup>
                  <Button type="submit" className="mb-2">
                    Login
                  </Button>
                  <p>
                    Dont have an account ?{" "}
                    <Link className="fw-bold" to="/signup">
                      Create an account
                    </Link>
                  </p>
                </Form>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Login;
