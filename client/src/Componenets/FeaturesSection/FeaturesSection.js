import React, { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './FeaturesSection.css';

const FeaturesSection = () => {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Animate features coming from the left
        gsap.fromTo(".feature:nth-of-type(odd)",
            { opacity: 0, x: -200 },
            {
                duration: 1,
                opacity: 1,
                x: 0,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: ".features-section",
                    start: "top center",
                    end: "bottom top",
                    toggleActions: "play none none none",
                }
            }
        );

        // Animate features coming from the right
        gsap.fromTo(".feature:nth-of-type(even)",
            { opacity: 0, x: 200 },
            {
                duration: 1,
                opacity: 1,
                x: 0,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: ".features-section",
                    start: "top center",
                    end: "bottom top",
                    toggleActions: "play none none none",
                }
            }
        );
    }, []);

    return (
        <div className="features-section">
            <h1 className="features-heading">Our Key Features</h1>
            <div className="features-grid">
                <div className="feature">
                    <h2 className='main' >Realistic <br></br> Experience</h2>
                    <p> Developements of realistic 3D models of the driving tracks, cars, pedestrians allow user to get the feels of real world.</p> </div>
                <div className="feature">
                    <h2 className='main' >Diverse <br></br>Scenarios</h2>
                    <p>Offer a comprehensive range of driving scenarios. From Parking to local market, ZenDrive caters all possible scenarios </p> </div>
                <div className="feature">
                    <h2 className='main' >Performance<br></br> Analytics</h2>
                    <p> Provides detailed feedback and performance analytics to users to let them know they are doing and learning. </p> </div>
                <div className="feature">
                    <h2 className='main' > Theory Signs <br></br> Test</h2>
                    <p> A Sign Test that enables the user to learn which sign meand what, so he can easily detect them in a real world environments.</p> </div>

            </div>
        </div>
    );
};

export default FeaturesSection;
