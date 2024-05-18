import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    const year = new Date().getFullYear(); // Dynamic year for the copyright

    return (
        <footer className="footer" style={{ backgroundColor: '#000', color: '#fff', minHeight: '10%' }}>
            <Container className='footer-cont'>
                <Row>
                    <Col className="text-center">
                        <p className='' >Connect With Us</p>
                        <a href="https://www.facebook.com" className="icon" aria-label="Facebook">
                            <FontAwesomeIcon icon={faFacebookF} />
                        </a>
                        <a href="https://www.twitter.com" className="icon" aria-label="Twitter">
                            <FontAwesomeIcon icon={faTwitter} />
                        </a>
                        <a href="https://www.instagram.com" className="icon" aria-label="Instagram">
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center py-3">
                        &copy; {year} VR Car Simulator. All Rights Reserved.
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
