import react from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SideBar from '../../Componenets/SideBar/SideBar.js';
import './ParkingPage.css';

const ParkingPage = () => {

    const navigate = useNavigate();

    const handleParallel = () => {
        // Redirect to the Unity mode URL
        window.location.href = 'http://localhost:3001/parallelParking/index.html';
    };
    const handlePerpendicular = () => {
        // Redirect to the Unity mode URL
        window.location.href = 'http://localhost:3001/perpendicularParking/index.html';
    }

    const handleReverse = () => {
        // Redirect to the Unity mode URL
        window.location.href = 'http://localhost:3001/reverseParking/index.html';
    }


    const hanleSideParallel = () => {
        // Redirect to the Unity mode URL
        window.location.href = 'http://localhost:3001/sideParallelParking/index.html';
    }

    const handleGarageParking = () => {
        // Redirect to the Unity mode URL
        window.location.href = 'http://localhost:3001/garageParking/index.html';
    }


    return (

        <div className="dashboard-container">
            <SideBar />
            <div className="main-content">
                <h2>What would you like to do today?</h2>

                <Col>
                    <div className="action-container action-icon parking">
                        <div>
                            <h2 className='action'>Garage Parking</h2>
                            <h1>The signs theory test evaluates your ability to recognize and understand road signs, including regulatory, warning, and informational signs.</h1>
                        </div>
                        <Button className='action-container-icon'
                            onClick={handleGarageParking}
                        >
                            Learn Garage Parking
                        </Button>
                    </div>
                </Col>
                <Col>
                    <div className="action-container action-icon parking">
                        <div>
                            <h2 className='action'>Parallel Parking</h2>
                            <h1>The signs theory test evaluates your ability to recognize and understand road signs, including regulatory, warning, and informational signs. </h1>
                        </div>

                        {/* Modify this Button element */}
                        <Button
                            className='action-container-icon'
                            onClick={handleParallel}
                        >
                            Learn Parallel Parking
                        </Button>
                    </div>
                </Col>
                <Col>
                    <div className="action-container action-icon parking">
                        <div>
                            <h2 className='action'>Perpendicular Parking</h2>
                            <h1>The signs theory test evaluates your ability to recognize and understand road signs, including regulatory, warning, and informational signs. </h1>
                        </div>

                        <Button className='action-container-icon'
                            onClick={handlePerpendicular}>
                            Learn Perpendicular Parking
                        </Button>

                    </div>
                </Col>
                <Col>
                    <div className="action-container action-icon parking">
                        <div>
                            <h2 className='action'>Reverse Parking</h2>
                            <h1>The signs theory test evaluates your ability to recognize and understand road signs, including regulatory, warning, and informational signs. </h1>
                        </div>

                        <Button className='action-container-icon'
                            onClick={handleReverse}>
                            Learn Reverse Parking
                        </Button>

                    </div>
                </Col>
                <Col>
                    <div className="action-container action-icon parking">
                        <div>
                            <h2 className='action'>Side Parking</h2>
                            <h1>The signs theory test evaluates your ability to recognize and understand road signs, including regulatory, warning, and informational signs. </h1>
                        </div>

                        <Button className='action-container-icon'
                            onClick={hanleSideParallel}>
                            Learn Side Parking
                        </Button>

                    </div>
                </Col>

            </div>
        </div>




    );

}

export default ParkingPage;