import React, { useState } from 'react';
import { Navigate, useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';
import backgroundImage from '../../Assets/images/backgroundImage.png';
import { useUser } from '../../CustomHooks/UserContext';
import './LoginForm.css';


function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [credentialsError, setCrentialsError] = useState("");
    const { setUser } = useUser();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:3001/account/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ rUsername: username, rEmail: email, rPassword: password }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.code === 0) {
                    alert('Login successful');
                    setUser({ username: username, email: email, token: data.token })
                    navigate('/dashboard');
                } else if (data.code === 1) {
                    setCrentialsError("Invalid credentials");
                }
                else {
                    setCrentialsError(data.msg);
                }
            })
            .catch(error => console.error('Error:', error));
    };
    const backgroundStyle = {
        background: `url(${backgroundImage}) no-repeat center center fixed`,
        backgroundSize: 'cover',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };


    return (
        <div className="login-background" style={backgroundStyle}>
            <Container className="login-form-container">
                <Row className="justify-content-md-center">
                    <Col xs={15} md={12}>
                        <h2 className="text-center">Sign In</h2>
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
                                {
                                    credentialsError &&
                                    <Form.Text className="text-danger">
                                        {credentialsError}
                                    </Form.Text>
                                }
                            </Form.Group>

                            <Button variant="primary" type="submit" className="w-100 mt-4">
                                Login
                            </Button>
                        </Form>
                        <div className="mt-4">
                            <Nav className="justify-content-center">
                                <Nav.Item>
                                    <Link to="/signup" className="nav-link">Don't have an account? Sign Up</Link>
                                </Nav.Item>
                            </Nav>
                            <Nav className="justify-content-center">
                                <Nav.Item>
                                    <Link to="/forgot-password" className="nav-link">Forgot Password?</Link>
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

export default LoginForm;
