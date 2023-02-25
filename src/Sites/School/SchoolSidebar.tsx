import React, { useRef } from 'react';
import LinkSection from '../../Components/LinkSection';
import * as Icon from 'react-bootstrap-icons';
import classes from './SchoolSidebar.module.css';

const Sidebar = () => {
    const navbarRef = useRef<HTMLDivElement>(null);

    return (
      <>
        <div className={classes.navbar} ref={navbarRef}>
          <div>
            <LinkSection
              elements={[
                {
                  destination: "/school/grades",
                  label: "Oceny",
                  icon: <Icon.Icon1CircleFill />,
                },
                {
                  destination: "/school/attendance",
                  label: "Frekwencja",
                  icon: <Icon.Fingerprint />,
                },
                {
                  destination: "/school/exams",
                  label: "Sprawdziany",
                  icon: <Icon.PenFill />,
                },
                {
                  destination: "/school/lessons",
                  label: "Plan lekcji",
                  icon: <Icon.Calendar3RangeFill />,
                },
                {
                  destination: "/school/messages",
                  label: "Wiadomości",
                  icon: <Icon.ChatLeftFill />,
                },
              ]}
            />
          </div>
        </div>
      </>
    );
}

export default Sidebar;
