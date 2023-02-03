import React from 'react';
import classes from './Register.module.css';
import registerImg from './Graphics/registerImg.png';
import Input from '../../../Components/Input';
import Checkbox from '../../../Components/Checkbox';
import Button from '../../../Components/Button';
import { Link } from 'react-router-dom';

const Register = () => {
    return (
    <div className={classes.loginFlex}>
            <div className={classes.formSide}>
                <div className={classes.loginForm}>
                    <p>Zarejestruj się</p>
                    <img src={registerImg} alt="cool register img" />
                    <form action="" className={classes.form}>
                        <Input type='email' placeholder="E-Mail"/>
                        <Input placeholder="Nazwa użytkownika"/>
                        <Input type="password" placeholder="Hasło"/>
                        <Input type="password" placeholder="Powtórz hasło"/>
                        <Checkbox label="Akceptuję regulamin"/>
                        <Button buttonText="Zarejestruj się"/>
                    </form>
                    <Link to={'/auth/login'}>Masz już konto? Zaloguj się!</Link>
                </div>
            </div>
            <div className={classes.img}></div>
        </div>
    )
}

export default Register;