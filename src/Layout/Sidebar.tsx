import React from 'react';
import LinkSection from '../Components/LinkSection';
import * as Icon from 'react-bootstrap-icons';
import classes from './Sidebar.module.css';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {

    return (
        <>
        <div className={classes.navbar}>
            <div className={classes.mainLogo}>
                <NavLink to="/">
                    <h1>Muj elektryk</h1>
                </NavLink>
            </div>
            <div className={classes.mainSection}>
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
                            destination: '/matrix',
                            label: 'Komunikator',
                            icon: <Icon.ChatFill/>
                        },
                        {
                            destination: '/Olyphiads',
                            label: 'Olimpiady',
                            icon: <Icon.CardChecklist/>
                        },
                        {
                            destination: '/diary',
                            label: 'Dziennik',
                            icon: <Icon.JournalBookmarkFill/>
                        },
                    ]}
                    />
            </div>
            <div className={classes.settingsSection}>
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