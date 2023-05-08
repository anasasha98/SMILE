import React, { useState  } from "react";
import Helmet from "../component/Helmet/Helmet";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Button } from "react-bootstrap";
import "../styles/auth.css";
import { auth } from "../firebase.config";
import {  updateProfile } from "firebase/auth";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";
import { storage } from "../firebase.config";
import { toast } from "react-toastify";
import { db } from "../firebase.config";
import { useNavigate } from "react-router-dom";
// import {userIcon} from '../assets/images/user-icon.png'
import { createUserWithEmailAndPassword } from 'firebase/auth';





const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
 
  const navigate = useNavigate();
  
  const signup = async (e) => {
    e.preventDefault();
      setLoading(true);
  
    try {
    
          const userCredential =await  createUserWithEmailAndPassword(
      auth, 
      email,
      password
       );
       const user = userCredential.user;
       const storageRef = ref(storage, `images/${Date.now() + username}`);
       const uploadTask = uploadBytesResumable(storageRef, file);
    
        
       
      uploadTask.on(
        (error) => {
          toast.error(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            //UPDATE USER Profile
            await updateProfile(user, {
              displayName: username,
              photoURL: downloadURL,
            });
            //store user data in firestore database
            await setDoc(doc(db,'users' , user.uid),{
              uid: user.uid,
              displayName :username,
              email,
              photoURL: downloadURL,

            });
           
          } );
        }
      );
      setLoading(false);
      toast.success("Account created successfully");
      navigate('/login');
    } catch (error) {
      setLoading(false)
      toast.error("something went wrong");
    }
  };

  return (
    <Helmet title="Signup">
      <section>
        <Container>
          <Row>
            {
              loading ? (<Col lg='12' className="text-center">
              <h5 className="fw-bold">Loading....</h5> </Col>) :
              <Col lg="6" className="m-auto text-center">
              <h3 className="fw-bold fs-4">Signup</h3>
              <Form className="auth_form" onSubmit={signup}zz>
                <FormGroup className="form_group my-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    value={username}
                    required
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <div className="invalid-feedback">
                    Please enter a valid username .
                  </div>
                </FormGroup>
                <FormGroup className="form_group my-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={email}
                    required
                    
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="invalid-feedback">
                    Please enter a valid email .
                  </div>
                </FormGroup>
                <FormGroup className="form_group mb-5">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={password}
                  

                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="invalid-feedback">
                    Please enter a valid password.
                  </div>
                </FormGroup>
                <FormGroup className="form_group mb-5">
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setFile(e.target.files[0])}
                    
                  />
                  <div className="invalid-feedback">
                    Please enter a valid password.
                  </div>
                </FormGroup>

                <Button type="submit" className="mb-2">
                  Create Account
                </Button>
                <p>
                  Already have an account ?{" "}
                  <Link className="fw-bold" to="/login">
                    Login
                  </Link>
                </p>
              </Form>
            </Col>
              
            }
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Signup;
