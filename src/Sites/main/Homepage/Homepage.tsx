import React from 'react';
// import classes from './Homepage.module.css';
import Wrapper from '../../../Layout/Wrapper';

const Homepage = () => {
    function getUserObject() {
        let pairs = document.cookie.split(";");
        const cookies: any = {};
        for (let i = 0; i < pairs.length; i++) {
            let pair = pairs[i].split("=");
            cookies[(pair[0] + '').trim()] = decodeURIComponent(pair.slice(1).join('='));
        }
        return JSON.parse(cookies['user_info']);
    }
    // @ts-ignore
    const user = getUserObject('user_info');

    return (
        <>
            <div>
                <h1>Witaj {user.name} {user.surname}!</h1>
            </div>
            <Wrapper>
                <h2>Aktualności</h2>
                <p>Konkurs Historyczny "Age of Violence"</p>
            </Wrapper>
            <Wrapper>
                <h2>Spotted</h2>
                <p>Nowe komentarze</p>
                <p>Proponowane posty</p>
            </Wrapper>
        </>
    );
}

export default Homepage;