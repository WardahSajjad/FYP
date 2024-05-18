import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './NewsletterSection.css'; // Make sure to create and import your CSS file

const NewsletterSection = () => {
    return (
        <div className="newsletter-section">
            <Container className='news-form justify-content-center'>
                <Row className="justify-content-center">
                    <Col md={6} className="text-center">
                        <h2 className='main' >Subscribe to Our Newsletter</h2>
                        <p>Get the latest news and updates right in your inbox.</p>
                        <Form>
                            <Form.Group controlId="newsletterEmail">
                                <Form.Control type="email" placeholder="Enter your email" />
                            </Form.Group>
                            <Button className='mt-4' variant="primary" type="submit">
                                Subscribe
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default NewsletterSection;
