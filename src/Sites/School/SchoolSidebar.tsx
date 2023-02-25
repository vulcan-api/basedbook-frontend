import React, {useRef} from 'react';
import LinkSection from '../../Components/LinkSection';
import * as Icon from 'react-bootstrap-icons';
import classes from './SchoolSidebar.module.css';
import {NavLink, useNavigate} from 'react-router-dom';
import getUserObject from '../../Lib/getUser';
//@ts-ignore
import {NotificationManager} from "react-notifications";

const Sidebar = () => {
    let user: any;
    // @ts-ignore
    user = getUserObject("user_info");

    const ref = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const logout = () => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        fetch("http://localhost:3000/auth/logout", {
            method: "POST",
            headers: myHeaders,
            redirect: "follow",
            credentials: "include",
        })
            .then((response) => response.text())
            .then(() => {
                NotificationManager.success("Udało się wylogować.", "Wylogowano", 3000);
                navigate("/auth/login")
            })
            .catch((error) => console.log("error", error));
    }

    return (
        <>
            <div className={classes.navbar} ref={ref}>
                <div>
                    <LinkSection
                        elements={[
                            {
                                destination: '/school/grades',
                                label: 'Oceny',
                                icon: <Icon.Icon1CircleFill/>
                            },
                            {
                                destination: '/school/attendance',
                                label: 'Frekwencja',
                                icon: <Icon.Fingerprint/>
                            },
                            {
                                destination: '/school/exams',
                                label: 'Sprawdziany',
                                icon: <Icon.PenFill/>
                            },
                            {
                                destination: '/school/lessons',
                                label: 'Plan lekcji',
                                icon: <Icon.Calendar3RangeFill/>
                            },
                            {
                                destination: '/school/messages',
                                label: 'Wiadomości',
                                icon: <Icon.ChatLeftFill/>
                            },
                        ]}
                    />
                </div>
            </div>
        </>
    )
}

export default Sidebar;
