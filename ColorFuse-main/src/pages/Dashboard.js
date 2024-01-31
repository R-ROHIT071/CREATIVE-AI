import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Navbar, Nav, Image } from 'react-bootstrap';
import { get, child } from "firebase/database";
import { auth, database, ref as dbRef, push } from '../firebase';
import { getStorage, ref as storageRef, uploadString, getDownloadURL } from 'firebase/storage';
import '../styles/dashboard.css'
import { FaSignOutAlt } from 'react-icons/fa';
import { IoMdImages, IoIosCube } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function Dashboard() {
    const [poster, setPoster] = useState(true);
    const [product, setProduct] = useState(false);
    const [allImageURLs, setAllImageURLs] = useState([]);
    const [allProductURLs, setallProductURLs] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const imageData = useSelector((state) => state.imageData) || false;
    const productData = useSelector((state) => state.posterData) || false;





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



    function upload(check) {
        const storage = getStorage();
        const userId = localStorage.getItem('UID');
        const timestamp = new Date().getTime();

        if (check === 1) {
            const { fullName, name, extension, imageBase64 } = imageData
            const userStorageRef = storageRef(storage, `${userId}/Posters/${timestamp}`);

            // Upload image to Firebase Storage
            uploadString(userStorageRef, imageBase64, 'data_url').then((snapshot) => {
                getDownloadURL(snapshot.ref).then((downloadURL) => {
                    const newData = {
                        imageURL: downloadURL,
                    };

                    push(dbRef(database, `users/${userId}/Posters`), newData).then(() => {
                        console.log('Image uploaded and data stored successfully');
                        dispatch({ type: 'SET_POSTER_DATA', payload: null });
                        dispatch({ type: 'SET_IMAGE_DATA', payload: null });

                    }).catch((error) => {
                        console.error('Error storing data in the database:', error);
                    });
                }).catch((error) => {
                    console.error('Error getting download URL:', error);
                });
            }).catch((error) => {
                console.error('Error uploading image to Firebase Storage:', error);
            });

        } else if (check === 2) {
            const userStorageRef = storageRef(storage, `${userId}/Products/${timestamp}`);

            uploadString(userStorageRef, productData, 'data_url').then((snapshot) => {
                getDownloadURL(snapshot.ref).then((downloadURL) => {
                    const newData = {
                        imageURL: downloadURL,
                    };

                    push(dbRef(database, `users/${userId}/Products`), newData).then(() => {
                        console.log('Image uploaded and data stored successfully');
                        dispatch({ type: 'SET_POSTER_DATA', payload: null });
                        dispatch({ type: 'SET_IMAGE_DATA', payload: null });

                    }).catch((error) => {
                        console.error('Error storing data in the database:', error);
                    });
                }).catch((error) => {
                    console.error('Error getting download URL:', error);
                });
            }).catch((error) => {
                console.error('Error uploading image to Firebase Storage:', error);
            });
        }

    }



    function download(check) {
        if (check === 1) {
            const imageDataObject = typeof imageData === 'object' ? imageData : JSON.parse(imageData);
            const { fullName, name, extension, imageBase64 } = imageDataObject;

            const downloadLink = document.createElement('a');
            downloadLink.href = imageBase64;
            downloadLink.download = fullName || name + (extension ? `.${extension}` : '.png');
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }

        else if (check === 2) {
            const downloadLink = document.createElement('a');
            downloadLink.href = productData;
            downloadLink.download = 'canvas_image.png';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }
    }


    useEffect(() => {
        let downloadCompleted = false;

        const fetchData = async () => {
            try {
                document.body.classList.add('blur');
                 if (imageData && !downloadCompleted) {
                    await upload(1);
                    await download(1);
                    downloadCompleted = true;
                } else if (productData && !downloadCompleted) {
                    await upload(2);
                    await download(2);
                    downloadCompleted = true;
                }

                if (poster) {
                    await getURLs(1);
                } else if (product) {
                    await getURLs(2);
                }
                document.body.classList.remove('blur');

            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, [imageData, productData, poster, product]);


    function getURLs(check) {
        const userId = localStorage.getItem('UID');
        if (check === 1) {
            const postersRef = dbRef(database, `users/${userId}/Posters`);

            get(child(postersRef, '/'))
                .then(snapshot => {
                    const postersData = snapshot.val();

                    if (postersData) {
                        const imageURLs = Object.values(postersData)
                            .map(postData => postData.imageURL)
                            .filter(Boolean);

                        setAllImageURLs(imageURLs);
                    } else {
                        console.log('No posters data found for the user');
                    }
                })
                .catch(error => {
                    console.error('Error retrieving data:', error);
                });
        } else if (check === 2) {
            const postersRef = dbRef(database, `users/${userId}/Products`);

            get(child(postersRef, '/'))
                .then(snapshot => {
                    const postersData = snapshot.val();

                    if (postersData) {
                        const imageURLs = Object.values(postersData)
                            .map(postData => postData.imageURL)
                            .filter(Boolean);

                        setallProductURLs(imageURLs);
                    } else {
                        console.log('No Product data found for the user');
                    }
                })
                .catch(error => {
                    console.error('Error retrieving data:', error);
                });

        }
    }

    const handlePosterClick = () => {
        setPoster(true);
        setProduct(false);
    };

    const handleProductClick = () => {
        setPoster(false);
        setProduct(true);
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
                        <Nav.Link onClick={handlePosterClick} active>
                            <IoMdImages /> Posters
                        </Nav.Link>
                        <Nav.Link onClick={handleProductClick}>
                            <IoIosCube /> Products
                        </Nav.Link>
                    </Nav>
                    <Nav className="ml-auto">
                        <Nav.Link onClick={handleFirebaseLogout}>
                            <FaSignOutAlt /> Logout
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            {poster && (
                <div className="poster-container">
                    <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>Your Posters</h2>
                    {allImageURLs.length === 0 ? (
                        <p style={{ textAlign: 'center', fontSize: '18px', color: '#555' }}>No posters yet.</p>
                    ) : (
                        <Row className="scrollable-row">
                            {allImageURLs.map((url, index) => (
                                <Col key={index} xs={6} md={3} lg={3}>
                                    <div className="image-container">
                                        <Image src={url} alt={`Poster ${index}`} rounded />
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    )}
                </div>
            )}


            {product && (
                <div className="poster-container">
                    <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>Your Product Images</h2>
                    {allProductURLs.length === 0 ? (
                        <p style={{ textAlign: 'center', fontSize: '18px', color: '#555' }}>No product images yet.</p>
                    ) : (
                        <Row className="scrollable-row">
                            {allProductURLs.map((url, index) => (
                                <Col key={index} xs={6} md={3} lg={3}>
                                    <div className="image-container">
                                        <Image src={url} alt={`Poster ${index}`} rounded />
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    )}
                </div>

            )}


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
    )

}
export default Dashboard