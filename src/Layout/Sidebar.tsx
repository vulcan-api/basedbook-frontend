import React, { useState } from 'react';
import LinkSection from '../Components/LinkSection';
import * as Icon from 'react-bootstrap-icons';
import classes from './Sidebar.module.css';
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();

    const [ clicked, setClicked ] = useState(true);
    
    const toggleClick = () => {
        clicked ? setClicked(false) : setClicked(true);
    }

    const logout = () => {
        console.log("ne maasz mamy");
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        fetch("http://localhost:3000/auth/logout", {
          method: "POST",
          headers: myHeaders,
          redirect: "follow",
          credentials: "include",
        })
          .then((response) => response.text())
          .then(() => {navigate("/auth/login")})
          .catch((error) => console.log("error", error));
    }   

    return (
        <>
            <div className={classes.navbar}>
                <div className={classes.mainLogo}>
                    <NavLink to="/">
                        <h1>BasedBook</h1>
                    </NavLink>
                </div>
                <div>
                    <LinkSection
                        elements={[
                            {
                                label: 'Szukaj',
                                icon: <Icon.Search/>,
                                onClick: toggleClick
                            },
                            {
                                destination: '/spotted',
                                label: 'Spotted',
                                icon: <Icon.PeopleFill/>
                            },
                            {
                                destination: '/chat',
                                label: 'Komunikator',
                                icon: <Icon.ChatFill/>
                            },
                            {
                                destination: '/olyphiads',
                                label: 'Olimpiady',
                                icon: <Icon.CardChecklist/>
                            },
                            {
                                destination: '/school',
                                label: 'Dziennik',
                                icon: <Icon.JournalBookmarkFill/>
                            },
                        ]}
                    />
                </div>
                <div>
                    <LinkSection
                        elements={[
                            {
                                destination: '/profile',
                                label: 'Profil',
                                icon: <Icon.PersonCircle/>
                            },
                            {
                                destination: '/settings',
                                label: 'Ustawienia',
                                icon: <Icon.Tools/>
                            },
                            {
                                label: "Wyloguj się",
                                icon: <Icon.DoorOpen />,
                                onClick: logout
                            }
                        ]}
                    />
                </div>
            </div>

        </>

    )
}

export default Sidebar;
