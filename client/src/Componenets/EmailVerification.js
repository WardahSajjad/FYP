import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function EmailVerificationComponent() {
    const { token } = useParams();

    useEffect(() => {
        verifyEmail();
    }, [token]);

    const verifyEmail = async () => {
        try {
            const response = await axios.get(`/api/verify-email/${token}`);
            alert(response.data.msg);
            // Handle email verification success
        } catch (error) {
            alert(error.response.data.msg);
        }
    };

    return (
        <div>
            Verifying email...
        </div>
    );
}

export default EmailVerificationComponent;
