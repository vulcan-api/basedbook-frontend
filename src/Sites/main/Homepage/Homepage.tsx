import React from 'react';
// import classes from './Homepage.module.css';
import Wrapper from '../../../Layout/Wrapper';

const Homepage = () => {

    return (
        <>
            <div>
                <h1>Witaj twoja mama 69!</h1>
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