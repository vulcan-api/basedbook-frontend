import React from 'react';
import Wrapper from '../../Layout/Wrapper';
import getUserObject from '../../Lib/getUser';

const Homepage = () => {
    let user: any;
    // @ts-ignore
    user = getUserObject("user_info");

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