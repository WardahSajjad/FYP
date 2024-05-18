import React, { useState } from 'react';
import { Navigate, useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';
import backgroundImage from '../../Assets/images/backgroundImage.png';
import './CreateAccountForm.css';

function CreateAccountForm() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState("");

    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        // Reset password error state on each submit attempt
        setPasswordError("");
        fetch('http://localhost:3001/account/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ rEmail: email, rUsername: username, rPassword: password }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.code === 0) {
                    alert('Account created successfully. Please check your email to verify.');
                    // Redirect to login page

                    navigate('/login');


                } else if (data.code === 3) {
                    // Specific handling for password requirement error
                    setPasswordError("Password must be at least 8 characters long, include at least one uppercase letter, one symbol, and one number.");
                } else {
                    // Handling other types of errors
                    setPasswordError(data.msg);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                setPasswordError("An error occurred while creating the account.");
            });
    };
    const backgroundStyle = {
        background: `url(${backgroundImage}) no-repeat center center fixed`,
        backgroundSize: 'cover',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };



    // <form onSubmit={handleSubmit}>
    //     <h2>Create Account</h2>
    //     <label>
    //         Email:
    //         <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
    //     </label>
    //     <br />
    //     <label>
    //         Username:
    //         <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
    //     </label>
    //     <br />
    //     <label>
    //         Password:
    //         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
    //     </label>
    //     <br />
    //     <button type="submit">Create Account</button>
    // </form>

    return (
        <div className="signup-background" style={backgroundStyle}>
            <Container className="signup-form-container">
                <Row className="justify-content-md-center">
                    <Col xs={15} md={20}>
                        <h2 className="text-center">Sign Up</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formBasicUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="username"
                                    placeholder="Enter username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                {passwordError && <div className="error-message">{passwordError}</div>}

                            </Form.Group>

                            <Button variant="primary" type="submit" className="w-100 mt-4">
                                Create Account
                            </Button>
                        </Form>
                        <div className="mt-4">
                            <Nav className="justify-content-center">
                                <Nav.Item>
                                    <Link to="/login" className="nav-link">Already have an account? Sign In</Link>
                                </Nav.Item>
                            </Nav>

                            <div className="social-login-options text-center">
                                <Button variant="primary" className="mr-2">
                                    <FontAwesomeIcon icon={faFacebookF} /> Facebook
                                </Button>
                                <Button variant="danger" className="ml-2">
                                    <FontAwesomeIcon icon={faGoogle} /> Google
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default CreateAccountForm;
