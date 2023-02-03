import React from 'react';
import Input from '../../../Components/Input';
import Checkbox from '../../../Components/Checkbox';
import classes from './Login.module.css';
import Button from '../../../Components/Button';
import loginImg from './Graphics/loginImg.png';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className={classes.loginFlex}>
            <div className={classes.img}></div>
            <div className={classes.formSide}>
                <div className={classes.loginForm}>
                    <p>Zaloguj się</p>
                    <img src={loginImg} alt="cool login img" />
                    <form action="" className={classes.form}>
                        <Input placeholder="E-Mail"/>
                        <Input type="password" placeholder="Hasło"/>
                        <p>Nie pamiętasz hasła?</p>
                        <Checkbox label="Zapamiętaj hasło"/>
                        <Button buttonText="Zaloguj się"/>
                    </form>
                    <Link to={'/auth/signup'}>Nie masz konta? Zarejestruj się!</Link>
                </div>
            </div>
        </div>
    )
}

export default Login;