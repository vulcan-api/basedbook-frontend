import React, {useRef, useState} from 'react';
import LinkSection from '../Components/LinkSection';
import * as Icon from 'react-bootstrap-icons';
import classes from './Sidebar.module.css';
import linkClasses from '../Components/LinkSection.module.css'
import {NavLink, useNavigate} from 'react-router-dom';
//@ts-ignore
import {NotificationManager} from "react-notifications";
import Searchbar from '../Components/Searchbar';
import getUserObject from '../Lib/getUser';
import LinkBase from '../Components/LinkBase';

const Sidebar = () => {
    let user: any;
    // @ts-ignore
    user = getUserObject("user_info");

    const ref = useRef<HTMLDivElement>(null);
    const [isShown, setIsShown] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
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

    window.addEventListener("keydown", (ev) => {
      ev.key === "Escape" && searchHandler();
    });

    const searchHandler = () => {
        setIsSearching(!isSearching);
    };

    return (
      <>
        {isSearching && (
          <div className={classes.hide} onClick={searchHandler}></div>
        )}
        <Searchbar sidebarWidth={ref.current?.offsetWidth} isSearching={isSearching}/>
        <div className={classes.navbar} ref={ref}>
          <div className={classes.mainLogo}>
            <NavLink to="/">
              <h1>BasedBook</h1>
            </NavLink>
          </div>
          <div>
            <div
              className={`${linkClasses.link} ${linkClasses.clickable} ${isShown ? classes.show : classes.hidden}`}
              onClick={searchHandler}
            >
              <LinkBase
                icon={<Icon.Search/>}
                label="Szukaj"
                style={isSearching ? { color: "var(--add1-500)" } : {}}
              />
            </div>
            <div>
              <LinkSection
                className={classes.mainIcons} 
                elements={[
                  {
                    destination: "/spotted",
                    label: "Spotted",
                    icon: <Icon.PeopleFill />,
                  },
                  {
                    destination: "/project",
                    label: "Projekty",
                    icon: <Icon.CardChecklist />,
                  },
                  {
                    destination: "/chat",
                    label: "Komunikator",
                    icon: <Icon.Chat />,
                  },
                  {
                    destination: "/school",
                    label: "Dziennik",
                    icon: <Icon.JournalBookmarkFill />,
                  },
                  {
                    label: "",
                    mobileOnly: true,
                    icon: <Icon.List/>,
                    onClick: () => {setIsShown(!isShown)},
                  }
                ]}
              />
            </div>
          </div>
          <div>
            <LinkSection
              className={isShown ? classes.show : classes.hidden}
              elements={[
                {
                  destination: `/profile/${user.id}`,
                  label: "Profil",
                  icon: <Icon.PersonCircle />,
                },
                {
                  destination: "/settings",
                  label: "Ustawienia",
                  icon: <Icon.Tools />,
                },
                {
                  label: "Wyloguj się",
                  icon: <Icon.DoorOpen />,
                  onClick: logout,
                },
              ]}
            />
          </div>
        </div>
      </>
    );
}

export default Sidebar;
