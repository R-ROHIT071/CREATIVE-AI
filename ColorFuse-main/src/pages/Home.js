// src/components/HomePage.js

import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Nav, Navbar, Row } from 'react-bootstrap';
import { FaEnvelope, FaPhone, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Animator, Fade, Move, MoveOut, ScrollContainer, ScrollPage, Sticky, batch } from "react-scroll-motion";
import { auth } from '../firebase';
import '../styles/home.css';

const HomePage = () => {
    const FadeUp = batch(Fade(), Move(0, 1000), Sticky());
    const FadeUp2 = batch(MoveOut(0, -1000), Move(0, 700), Sticky());
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    const [Active, setActive] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    dispatch({ type: 'SET_POSTER_VAL', payload: false });

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setActive(true)
            } else {
                setActive(false)
            }
        });
    })
     useEffect(() => {
    window.botpressWebChat.init({
      "composerPlaceholder": "Chat with bot",
      "botConversationDescription": "This chatbot was built surprisingly fast with Botpress",
      "botId": "12fb2fd9-b153-431a-92b5-a1d8293ae29a",
      "hostUrl": "https://cdn.botpress.cloud/webchat/v1",
      "messagingUrl": "https://messaging.botpress.cloud",
      "clientId": "12fb2fd9-b153-431a-92b5-a1d8293ae29a",
      "webhookId": "6d0cc680-88f6-4628-9b39-6bc8e3a02ad6",
      "lazySocket": true,
      "themeName": "prism",
      "frontendVersion": "v1",
      "showPoweredBy": true,
      "theme": "prism",
      "themeColor": "#2563eb"
    });
  }, []);

    const handleFirebaseLogout = async () => {
        try {
            await auth.signOut();
            dispatch({ type: 'SET_POSTER_DATA', payload: null });
            dispatch({ type: 'SET_IMAGE_DATA', payload: null });
            localStorage.removeItem('UID');
            navigate('/', { replace: true });
        } catch (error) {
            console.error('Error logging out:', error.message);
        }
    };

    //server health  test
    fetch(backendUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.text(); 
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });


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
                        />{' '}
                        ColorFuse
                    </Navbar.Brand>
                    <Nav className="ml-auto">
                        {Active && <Nav.Link as={Link} to="/dashboard">
                            <MdDashboard /> Dashboard
                        </Nav.Link>}
                        {Active && <Nav.Link onClick={handleFirebaseLogout}>
                            <FaSignOutAlt /> Logout
                        </Nav.Link>}
                        {!Active && <Nav.Link as={Link} to="/signup">
                            <FaSignInAlt /> Login
                        </Nav.Link>}
                    </Nav>
                </Container>
            </Navbar>

            <ScrollContainer>
                <Container fluid className="homepage-background position-relative">
                    {/* Welcome Text */}
                    <ScrollPage>
                        <Animator animation={batch(Fade(), Sticky(), MoveOut(0, -2000))}>
                            <div className="centered-text">
                                <h1 style={{ fontSize: '60px' }}>Welcome to ColorFuse</h1>
                                <h4>Your platform for AI-generated creativity!</h4>
                            </div>
                        </Animator>
                    </ScrollPage>

                </Container>

                {/* Features Section */}
                <ScrollPage>
                    <Animator animation={FadeUp}>

                        {/* AI Poster Generation Feature */}
                        <Container className="features-section mt-5 text-center">
                            <Row>
                                <Col md={6}>
                                    <div className="features-box">
                                        <div className="text-container">
                                            <h2 style={{ width: '500px' }}>AI Poster Generation</h2>
                                            <p>
                                                Transform your ideas into stunning posters with the power of
                                                artificial intelligence. Our AI-powered poster generation
                                                ensures that your designs are not only visually appealing but
                                                also tailored to your unique needs.
                                            </p>
                                            <Button
                                                variant="primary"
                                                size="lg"
                                                as={NavLink}
                                                to="/poster"
                                                className="poster-button"
                                            >
                                                Generate Posters
                                            </Button>
                                        </div>
                                        <img
                                            src="/ai.jpg"
                                            alt="AI LOGO Generation"
                                            className="feature-image"
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </Animator>
                </ScrollPage>







                {/* AI LOGO GENERATION*/}
                <ScrollPage>
                    <Animator animation={FadeUp}>

                        {/* AI logo Generation Feature */}
                        <Container className="features-section mt-5 text-center">
                            <Row>
                                <Col md={8}>
                                    <div className="features-box">
                                        <div className="text-container">
                                            <h2 style={{ width: '500px' }}>AI LOGO MAKER</h2>
                                            <p>
                                                Transform your ideas into stunning posters with the power of
                                                artificial intelligence. Our AI-powered poster generation
                                                ensures that your designs are not only visually appealing but
                                                also tailored to your unique needs.
                                            </p>
                                            <Button
                                                variant="primary"
                                                size="lg"
                                                as={NavLink}
                                                to="/poster"
                                                className="poster-button"
                                            >
                                                Generate LOGO'S
                                            </Button>
                                        </div>
                                        <img
                                            src="/ai.jpg"
                                            alt="AI LOGO Generation"
                                            className="feature-image"
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </Animator>
                </ScrollPage>









                {/* Product Branding Feature */}
                <ScrollPage>
                    <Animator animation={FadeUp2}>
                        <Container className="features-section mt-5 text-center">
                            <Row>
                                <Col md={6}>
                                    <div className="features-box">
                                        <div className="text-container">
                                            <h2 style={{ width: '500px' }}>Product Branding</h2>
                                            <p>
                                                Revitalize your product image with our specialized branding solutions.
                                                Easily tweak colors and strategically place logos with our tools.
                                                Cultivate a distinctive brand identity that captivates your audience and elevates your presence.
                                            </p>
                                            <Button
                                                variant="success"
                                                size="lg"
                                                as={NavLink}
                                                to="/product"
                                                className="brand-button"
                                            >
                                                Brand My Product
                                            </Button>
                                        </div>
                                        <img
                                            src="/pro.jpg"
                                            alt="Product Branding"
                                            className="feature-image"
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </Animator>
                </ScrollPage>

            </ScrollContainer>

            {/* About Section */}
            <Container className="about-section mt-5">
                <Row className="align-items-center">
                    {/* Left Column: About */}
                    <Col md={8} className="order-md-1 order-2">
                        <div className="about-box">
                            <h2 className="section-heading">About Us</h2>
                            <p>ColorFuse is a revolutionary platform that leverages artificial intelligence</p>
                            <p>to bring creativity to new heights. Our mission is to empower individuals and</p>
                            <p>businesses with unique and innovative design solutions.</p>
                        </div>
                    </Col>

                    {/* Right Column: Contact Details */}
                    <Col md={3} className="order-md-1 order-2">
                        <div className="contact-box">
                            <h2 className="section-heading">Contact Us</h2>
                            <div>
                                <p>
                                    <FaEnvelope /> Email: colorfuse@gmail.com
                                </p>
                                <p>
                                    <FaPhone /> Phone: (123) 456-7890
                                </p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>

            {/* Footer */}
            <footer className="footer mt-5 text-center">
                <Container>
                    <Row>
                        <Col md={12}>
                            <span>&copy; 2023 ColorFuse. All rights reserved. </span>
                            <img src="/images/logo.jpg" alt="/images/logo.jpg" className="logo" />
                        </Col>
                    </Row>
                </Container>
   
            </footer>
        </>
    );
};


export default HomePage;
