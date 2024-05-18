import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../../CustomHooks/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faDesktop, faTabletAlt, faMobileAlt, faSearch, faMapMarkerAlt, faMobile } from '@fortawesome/free-solid-svg-icons';
import { faBook, faCar } from '@fortawesome/free-solid-svg-icons';


import './Dashboard.css';
import SideBar from '../../Componenets/SideBar/SideBar.js';

const Dashboard = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Get the current location
    const { user } = useUser();

    const handleAttemptTestButton = () => {
        navigate('/quiz');
    };

    const handleStartDrivingButton = () => {
        navigate('/modes');
    };
    return (

        <div className="dashboard-container">
            <SideBar />


            <div className="main-content">

                <h1 className='main'>Welcome, {user.username}!</h1>
                <h2>What would you like to do today?</h2>


                {/* Additional containers for asking the user */}
                {/* Parallel action containers */}
                <Row>
                    <Col>
                        <div className="action-container action-icon">
                            <div>
                                <h2 className='action'>TEST</h2>
                                <h1>The signs theory test evaluates your ability to recognize and understand road signs, including regulatory, warning, and informational signs. Passing this test ensures you can interpret signs accurately, contributing to safer driving practices.</h1>
                            </div>
                            <Button onClick={handleAttemptTestButton} >
                                <FontAwesomeIcon icon={faBook} /> Attemp Test
                            </Button>
                        </div>
                    </Col>
                    <Col>
                        <div className="action-container action-icon">
                            <div>
                                <h2 className='action'>DRIVE</h2>
                                <h1>The signs theory test evaluates your ability to recognize and understand road signs, including regulatory, warning, and informational signs. Passing this test ensures you can interpret signs accurately, contributing to safer driving practices.</h1>
                            </div>

                            <Button onClick={handleStartDrivingButton}>
                                <FontAwesomeIcon icon={faCar} /> Start Driving
                            </Button>

                        </div>
                    </Col>
                </Row>
            </div>
        </div>




    );
};

export default Dashboard;
