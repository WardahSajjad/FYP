import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faDesktop, faTabletAlt, faMobile, faUser, faSignOutAlt, faChartLine, faBook, faCar } from '@fortawesome/free-solid-svg-icons';
import { useUser } from '../../CustomHooks/UserContext';
import './SideBar.css';


const SideBar = () => {
    const { user } = useUser();

    const navigate = useNavigate();

    const home = () => {
        navigate('/');
    }
    const Modes = () => {
        navigate('/modes');
    }
    const Test = () => {
        navigate('/quiz');
    }
    const Signout = () => {
        navigate('/signout');
    }
    const performance = () => {
        navigate('/performance');
    }

    return (

        <div className="sidebar">

            <div className="sidebar-item" >
                <div className="sidebar-icon user-icon"><FontAwesomeIcon icon={faUser} /></div>
                <div className="sidebar-text side-name">Hey, {user.username}</div>
            </div>
            <div className="sidebar-item" onClick={home}>
                <div className="sidebar-icon"><FontAwesomeIcon icon={faHome} /></div>
                <div className="sidebar-text">Home</div>
            </div>
            <div className="sidebar-item" onClick={Test}>
                <div className="sidebar-icon"><FontAwesomeIcon icon={faBook} /></div>
                <div className="sidebar-text">Signs Test</div>
            </div>
            <div className="sidebar-item" onClick={Modes}>
                <div className="sidebar-icon"><FontAwesomeIcon icon={faCar} /></div>
                <div className="sidebar-text">Driving Modes</div>
            </div>
            <div className="sidebar-item" onClick={performance}>
                <div className="sidebar-icon"><FontAwesomeIcon icon={faChartLine} /></div>
                <div className="sidebar-text">My Performance</div>
            </div>
            <div className="sidebar-item" onClick={Signout}>
                <div className="sidebar-icon"><FontAwesomeIcon icon={faSignOutAlt} /></div>
                <div className="sidebar-text">Sign Out</div>
            </div>
        </div>
    );
}

export default SideBar;