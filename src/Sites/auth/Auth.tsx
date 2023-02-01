import React from 'react';
import { Navigate } from 'react-router-dom';
const Auth = () => {
    return <>
    <Navigate to="/auth/login" replace={true} />
    </>
}

export default Auth;