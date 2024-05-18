import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import logo from '../../Assets/images/logo.png';
import './Header.css';

const Header = () => {
    const navigate = useNavigate();
    const home = () => {
        navigate('/');
    }
    const goToFeatures = () => {
        // If the features section is on another page, navigate there first
        navigate('/'); // Assuming '/' is your landing page where the features section is

        // Next, scroll to the features section
        // This will work only if the navigation didn't cause a full page reload
        // You might need to adjust timing or approach based on your app's behavior
        setTimeout(() => {
            const featuresSection = document.getElementById('features-section');
            if (featuresSection) {
                featuresSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 0);
    };
    return (
        <Navbar
            expand="lg" variant="dark" style={{ backgroundColor: '#000000' }} className="sticky-top">
            <Container>
                {/* <Link to="/" className="navbar-brand">VR Car Simulator</Link> */}

                <Navbar.Brand onClick={home}>
                    <img
                        src={logo}
                        className="logo d-inline-block align-top" // Aligns the image with navbar items
                        alt="Logo"
                    />

                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Link to="/" className="nav-link">Home</Link>
                        <a className="nav-link" onClick={goToFeatures} style={{ cursor: 'pointer' }}>Features</a>
                        <Link to="/pricing" className="nav-link">Pricing</Link>
                        <Link to="/about" className="nav-link">About</Link>
                        {/* <Link to="/login" className="nav-link">
                            <FontAwesomeIcon icon={faSignInAlt} className="nav-icon" /> Login
                        </Link> */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
