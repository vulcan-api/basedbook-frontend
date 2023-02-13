import React from 'react';
import LinkSection from '../Components/LinkSection';
import * as Icon from 'react-bootstrap-icons';
import classes from './Sidebar.module.css';
import {NavLink} from 'react-router-dom';
import Searchbar from '../Components/Searchbar';



const Sidebar = () => {
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
                                destination: '/search',
                                label: 'Szukaj',
                                icon: <Icon.Search/>
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
                        ]}
                    />
                </div>
            </div>

        </>

    )
}

export default Sidebar;