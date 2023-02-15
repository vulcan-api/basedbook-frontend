import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Auth = () => {
    const navigate = useNavigate();

    useEffect(() => {
            navigate("/auth/login");
    },[navigate])

    return <></>;
}

export default Auth;