import react from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SideBar from '../../Componenets/SideBar/SideBar.js';
import './ModesPage.css';
const ModesPage = () => {

    const navigate = useNavigate();


    const handleMediumClick = () => {
        navigate('/parking');
    }
    const handleEasyMode = () => {
        // Redirect to the Unity mode URL
        window.location.href = 'http://localhost:3001/easyMode/index.html'; // Adjust the URL as needed
    };



    return (

        <div className="dashboard-container">
            <SideBar />
            <div className="main-content">
                <h2 className='main-heading'>What would you like to do today?</h2>
                <Row >
                    <Col>
                        <div className="action-container action-icon mode">
                            <div>
                                <h2 className='action'>Easy Mode</h2>
                                <h1>The signs theory test evaluates your ability to recognize and understand road signs, including regulatory, warning, and informational signs.</h1>
                            </div>
                            <Button className='action-container-icon' onClick={handleEasyMode}>
                                Take Your First Step
                            </Button>
                        </div>
                    </Col>
                    <Col>
                        <div className="action-container action-icon mode">
                            <div>
                                <h2 className='action'>Medium Mode</h2>
                                <h1>The signs theory test evaluates your ability to recognize and understand road signs, including regulatory, warning, and informational signs. </h1>
                            </div>

                            {/* Modify this Button element */}
                            <Button
                                className='action-container-icon'
                                onClick={handleMediumClick}
                            >
                                Delve More Deep
                            </Button>
                        </div>
                    </Col>

                </Row>
                <Row className='hard-box'>
                    <Col>
                        <div className="action-container action-icon hard">
                            <div>
                                <h2 className='action'>Hard Mode</h2>
                                <h1>The signs theory test evaluates your ability to recognize and understand road signs, including regulatory, warning, and informational signs. </h1>
                            </div>

                            <Button className='action-container-icon'>
                                You Can Do This
                            </Button>

                        </div>
                    </Col>
                </Row>
            </div>
        </div>




    );
}

export default ModesPage;