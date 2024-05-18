const Garage = () => {
    // Adjust the URL based on the IP address and port shown by http-server
    const unityGameUrl = "http://127.0.0.1:8000/index.html";

    return (
        <iframe src={unityGameUrl} width="960" height="600" style={{ border: "none" }}></iframe>
    );
};

export default Garage;