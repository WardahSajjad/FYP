import React, { useState, useEffect } from 'react';

const UnityDataHandler = () => {
    // State to hold data received from Unity
    const [unityData, setUnityData] = useState({});

    useEffect(() => {
        // Define a global function that Unity can call
        window.SendDataToReact = (message) => {
            const parsedData = JSON.parse(message);
            console.log('Received data from Unity:', parsedData);
            // Update React state with the received data
            setUnityData(parsedData);
        };

        // Clean up the effect by removing the global function when the component unmounts
        return () => {
            delete window.SendDataToReact;
        };
    }, []);

    // Render something based on the Unity data
    return (
        <div>
            <h1>Data Received from Unity:</h1>
            <pre>{JSON.stringify(unityData, null, 2)}</pre>
        </div>
    );
};

export default UnityDataHandler;
