import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { gsap } from 'gsap';
import './LandingPage.css';
import backgroundVideo from '../../Assets/videos/vid2.mp4'; // Replace with your video path
import SimulatorDescription from '../../Componenets/SimulatorDescription/SimulatorDescription.js';
import FeaturesSection from '../../Componenets/FeaturesSection/FeaturesSection.js';
import VideoSection from '../../Componenets/VideoSection/VideoSection.js';
import NewsletterSection from '../../Componenets/NewsletterSection/NewsletterSection.js';

const LandingPage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        // GSAP animations for a more dynamic effect
        gsap.to('.title', { duration: 1, delay: 0.5, y: 0, opacity: 1, ease: 'power3.out' });
        gsap.to('.subtitle', { duration: 1, delay: 1, y: 0, opacity: 1, ease: 'power3.out' });
        gsap.to('.play-now-btn', { duration: 1, delay: 1.5, y: 0, opacity: 1, ease: 'power3.out' });
    }, []);

    const navigateToLogin = () => {
        navigate('/login');
    }
    return (
        <>
            <div className="landing-page">
                <video autoPlay loop muted className="background-video" src={backgroundVideo} />
                <div className="overlay"></div>
                <Container className="content-container">
                    <Row className="align-items-center justify-content-center">
                        <Col md={8} className="text-left">
                            <h1 className="title">
                                <span className="title-word1">VIRTUAL REALITY</span>
                                <span className="title-word2">Car Simulator</span>
                            </h1>
                            <p className="subtitle h4">Gear up for the most realistic driving experience.</p>
                            <Button variant="light" className="play-now-btn mt-4 ml-20" onClick={navigateToLogin}>
                                Sign In To Play
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </div>
            {/* Wrap the sections in a separate container to avoid flexbox influence from the landing-page class */}
            <div>
                <SimulatorDescription />
                <FeaturesSection />
                <VideoSection />
                <NewsletterSection />
            </div>
        </>
    );
};

export default LandingPage;
