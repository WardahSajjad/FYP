import React, { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './SimulatorDescription.css';
// Ensure you have an image named vr-headset.jpg in your project's assets/images folder
import vrHeadsetImage from '../../Assets/images/vr-headset.png';
import { Button } from 'react-bootstrap';
gsap.registerPlugin(ScrollTrigger);

const SimulatorDescription = () => {
    useEffect(() => {
        gsap.to('.simulator-description-text', {
            scrollTrigger: {
                trigger: '#simulator-description',
                start: 'top center', // Adjust as needed
                toggleActions: 'play none none none',
            },
            x: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            from: { x: -200, opacity: 0 },
        });

        gsap.to('.vr-headset-image', {
            scrollTrigger: {
                trigger: '#simulator-description',
                start: 'top center', // Adjust as needed
                toggleActions: 'play none none none',
            },
            y: 0,
            x: 0,
            opacity: 1,
            duration: 1.5,
            ease: 'power3.out',
            from: { y: -200, x: 200, opacity: 0 },
        });
    }, []);

    return (
        <div id="simulator-description" className="section animated-section">
            <div className="simulator-description-text">
                <h2 className='main'>What is ZenDrive?</h2>
                <p className='mt-4'>Our VR-based car simulator <span style={{ fontWeight: 'bold', fontStyle: 'italic', color: '#830606' }}>ZenDrive</span> offers an immersive driving experience, allowing users to navigate through realistic road scenarios and environments. It's designed to improve driving skills, enhance road safety awareness, and provide a safe platform for practicing different driving conditions. With intuitive controls and dynamic feedback, users can experience the thrill of driving without the risks of the real road.</p>
                <Button variant="light" className="play-now-btn mt-4 desc-btn"> Explore More </Button>
            </div>
            <div className="vr-headset-image">
                <img src={vrHeadsetImage} alt="VR Headset" />
            </div>
        </div>
    );
};



export default SimulatorDescription;
