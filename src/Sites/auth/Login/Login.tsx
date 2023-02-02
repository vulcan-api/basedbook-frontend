import React from 'react';
import Input from '../../../Components/Input';
import Checkbox from '../../../Components/Checkbox';

const Login = () => {
    return (
        <>
            <h1>Tu logowanie</h1>
            <Input placeholder="jajco" className="alternate"/>
            <Checkbox label="Akceptuję regulamin"/>
        </>
    )
}

export default Login;