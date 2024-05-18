import React, { useRef, useEffect } from 'react';
import './VideoSection.css';
import backgroundVideo from '../../Assets/videos/vid3.mp4';

const VideoSection = () => {

    const VideoSection = () => {
        const videoRef = useRef(null); // Reference to the video element

        useEffect(() => {
            // Define ScrollTrigger actions here
            // Example: Playing and pausing video based on scroll position
            // Make sure to only call video methods if videoRef.current is not null
            if (videoRef.current) {
                // ScrollTrigger or other scroll event listeners can be set up here
                // Ensure they access videoRef.current safely
            }
        }, []);
    }
    return (
        <div className="video-section" id="video-section">
            <video autoPlay loop muted className="background-video" src={backgroundVideo} style={{ width: '100%' }}>
                Your browser does not support the video tag.
            </video>

            <div className="video-overlay">
                <button className="explore-btn">Explore Now</button>
            </div>
        </div>
    );
};

export default VideoSection;
