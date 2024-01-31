import '../styles/signup.css';
import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Navbar } from 'react-bootstrap';
import { FaEnvelope, FaLock, FaUser, FaPhone, FaQuestion } from 'react-icons/fa';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, updateProfile } from 'firebase/auth';
import { auth, database, ref as dbRef, set } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
  });

  const clearFormData = () => {
    setFormData({
      email: '',
      password: '',
      name: '',
      phone: '',
    });
  };

  const posertOn = useSelector((state) => state.posterVal)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // For Background changing
  useEffect(() => {
    const backgroundImageLogin = `url(${require('../images/login.jpg')})`;
    const backgroundImageNotLogin = `url(${require('../images/signup2.jpg')})`;
    const elem = document.getElementById('hyper-main')
    elem.style.transition = 'background-image 0.5s ease-in-out';

    elem.style.backgroundImage = isLogin ? backgroundImageLogin : backgroundImageNotLogin;
  }, [isLogin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const toggleForm = () => {
    setError(null);
    setIsLogin(!isLogin);
  };

  const handleForgotPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, formData.email);
      alert('Password reset email sent successfully to your email!');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      setError(errorMessage);
      console.error('Error sending password reset email:', errorCode, errorMessage);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (isLogin) {
        // Login
        const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
        const userId = userCredential.user.uid;
        console.log("User logged in!")
        clearFormData();
        localStorage.setItem('UID', userId)
        if (posertOn === true) {
          dispatch({ type: 'SET_POSTER_VAL', payload: false });
          navigate('/postercanvas')
        } else {
          dispatch({ type: 'SET_POSTER_VAL', payload: false });
          navigate('/dashboard');
        }

      } else {
        // Sign up
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        const { name, phone } = formData;
        await updateProfile(userCredential.user, { displayName: name });

        const userId = userCredential.user.uid;
        await set(dbRef(database, `users/${userId}`), {
          name,
          phone,
        });
        clearFormData();
        console.log('User signed up:', userCredential.user);
        localStorage.setItem('UID', userId)
        if (posertOn === true) {
          dispatch({ type: 'SET_POSTER_VAL', payload: false });
          navigate('/postercanvas')
        } else {
          dispatch({ type: 'SET_POSTER_VAL', payload: false });
          navigate('/dashboard');
        }
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      setError(errorMessage);
      console.error('Authentication error:', errorCode, errorMessage);
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            <img
              alt=""
              src="/images/logo.jpg"
              width="30"
              height="30"
              className="d-inline-block align-top"
              style={{ borderRadius: '100%', marginRight: '10px' }}
            />
            ColorFuse
          </Navbar.Brand>
        </Container>
      </Navbar>

      <div id='hyper-main'>
        <Container>
          <Row className="justify-content-md-center">
            <Col md={6} className={`auth-form ${isLogin ? 'login' : 'signup'}`}>
              <div>
                {posertOn ? (
                  <>
                    <h2 style={{
                      textAlign: 'center',
                      fontSize: '1.8rem',
                      fontWeight: 'bold',
                      color: '#34495e',
                      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                    }}>
                      Zero Cost, Zero Barriers: Join ColorFuse for Free!
                    </h2>
                    <h3 style={{ textAlign: 'center', fontSize: '1.5rem', color: '#555', }}>
                      {isLogin ? 'Login to continue' : 'Sign Up to continue'}
                    </h3>
                  </>
                ) : (
                  <h2 style={{ textAlign: 'center' }}>{isLogin ? 'Login!' : 'Sign Up!'}</h2>
                )}
              </div>
              <Form onSubmit={handleSubmit}>
                {error && <p style={{ color: 'red' }}>{error.split(': ')[1]}</p>}
                <Form.Group controlId="formBasicEmail">
                  <div className="icon-prepend">
                    <FaEnvelope />
                  </div>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">

                  <div className="icon-prepend">
                    <FaLock />
                  </div>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </Form.Group>

                {!isLogin && (
                  <>
                    <Form.Group controlId="formBasicName">

                      <div className="icon-prepend">
                        <FaUser />
                      </div>
                      <Form.Control
                        type="text"
                        placeholder="Enter your name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </Form.Group>

                    <Form.Group controlId="formBasicPhone">

                      <div className="icon-prepend">
                        <FaPhone />
                      </div>
                      <Form.Control
                        type="tel"
                        placeholder="Enter your phone number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </>
                )}

                {isLogin && (
                  <p onClick={handleForgotPassword} className="forgot-password">
                    Forgot Password<FaQuestion />
                  </p>
                )}

                <Button variant="primary" type="submit">
                  {isLogin ? 'Login' : 'Sign Up'}
                </Button>

                <p onClick={toggleForm} className="toggle-form">
                  {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
                </p>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>

      <footer className="footer mt-5 text-center fixed-bottom">
        <Container>
          <Row>
            <Col md={12}>
              <span>&copy; 2023 ColorFuse. All rights reserved. </span>
              <img src="/images/logo.jpg" alt="Your Company Logo" className="logo" />
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default AuthForm;
