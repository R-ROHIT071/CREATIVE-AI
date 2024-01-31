import React, { useRef, useState } from "react";
import { Button, Container, Row, Col, Navbar, Nav, Form } from 'react-bootstrap';
import '../styles/selection.css';
import { FaImage, FaImages } from 'react-icons/fa';
import ProductCanvas from "./ProductCanvas";


function Selection() {
    const [selectedImages, setSelectedImages] = useState({
        frontView: null,
        backView: null,
        sideView: null,
        additionalImages: [],
    });

    const [showSaveButton, setShowSaveButton] = useState(false);
    const [Canvas, setCanvas] = useState(false);

    const frontViewRef = useRef();
    const backViewRef = useRef();
    const sideViewRef = useRef();
    const additionalImagesRef = useRef();

    const handleGenerateButtonClick = () => {
        const frontViewFile = frontViewRef.current.files[0];
        const backViewFile = backViewRef.current.files[0];
        const sideViewFile = sideViewRef.current.files[0];
        const additionalImagesFiles = Array.from(additionalImagesRef.current.files);

        const newSelectedImages = {
            frontView: frontViewFile,
            backView: backViewFile,
            sideView: sideViewFile,
            additionalImages: additionalImagesFiles,
        };

        setSelectedImages(newSelectedImages);
        setCanvas(true);
        setShowSaveButton(true)
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
                        />{' '}
                        ColorFuse
                    </Navbar.Brand>
                    <Nav className="ml-auto">
                        {showSaveButton && <Nav.Link id="save_link">Export & Save Canvas</Nav.Link>}
                    </Nav>
                </Container>
            </Navbar>

            <div className="selection-wrapper">
                <Container className="mt-3">
                    {!Canvas &&
                        <div className="head">
                            <h1>Welcome to Brand my Product!</h1>
                            <p>Upload your product images and logos to generate stunning visuals.</p>
                        </div>
                    }
                </Container>
                {!Canvas && (<div className="blurry-image"></div>)}
                <Container>
                    {!Canvas && (
                        <div className="form-container">
                            <Form className="pform">
                                <Form.Group controlId="frontView">
                                    <Form.Label>
                                        <FaImage /> Front View
                                    </Form.Label>
                                    <Form.Control type="file" accept="image/*" ref={frontViewRef} required />
                                </Form.Group>

                                <Form.Group controlId="backView">
                                    <Form.Label>
                                        <FaImage /> Back View
                                    </Form.Label>
                                    <Form.Control type="file" accept="image/*" ref={backViewRef} required />
                                </Form.Group>

                                <Form.Group controlId="sideView">
                                    <Form.Label>
                                        <FaImage /> Side View
                                    </Form.Label>
                                    <Form.Control type="file" accept="image/*" ref={sideViewRef} />
                                </Form.Group>

                                <Form.Group controlId="additionalImages">
                                    <Form.Label>
                                        <FaImages /> Logo Images
                                    </Form.Label>
                                    <Form.Control type="file" accept="image/*" ref={additionalImagesRef} multiple />
                                </Form.Group>

                                <Button variant="primary" type="button" onClick={handleGenerateButtonClick}>
                                    Generate
                                </Button>
                            </Form>
                        </div>
                    )}
                </Container>

                {Canvas && <ProductCanvas selectedImages={selectedImages} />}

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
}

export default Selection;
