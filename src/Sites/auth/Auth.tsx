import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Auth = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const sSE = () => {
            navigate("/auth/login");
        }

        sSE();
    },[navigate])

    return <></>;
}

export default Auth;