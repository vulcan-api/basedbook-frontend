import React, { ReactNode, useCallback, useEffect, useState } from "react";
import {
  BrowserFirefox,
  Facebook,
  Instagram,
  Youtube,
} from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import classes from "./SocialsModal.module.css";

interface SocialsModalProps {
  userId: Number;
  onClose: Function;
  showSpinner: Function;
}

interface SocialElementProps {
  icon: ReactNode;
  name: string;
  url: string;
  fullUrl?: boolean;
}

interface SocialObjectProps {
  facebook: string;
  instagram: string;
  youtube: string;
  website: string;
}

const SocialElement = (props: SocialElementProps) => (
  <Link
    to={props.url + (props.fullUrl ? "" : props.name)}
    className={classes.socialElem}
    target="_blank"
  >
    <span className={classes.icon}>{props.icon}</span>
    <span className={classes.name}>{props.name}</span>
  </Link>
);

const SocialsModal = (props: SocialsModalProps) => {
  const [socials, setSocials] = useState<Array<SocialElementProps>>();
  const [isLoaded, setIsLoaded] = useState(false);

  const setupSocials = useCallback((json: SocialObjectProps) => {
    const toSet: Array<SocialElementProps> = [];
    json.facebook &&
      toSet.push({
        icon: <Facebook />,
        name: json.facebook,
        url: "https://facebook.com/",
      });
    json.instagram &&
      toSet.push({
        icon: <Instagram />,
        name: json.instagram,
        url: "https://instagram.com/",
      });
    json.youtube &&
      toSet.push({
        icon: <Youtube />,
        name: json.youtube,
        url: "https://youtube.com/@",
      });
    json.website &&
      toSet.push({
        icon: <BrowserFirefox />,
        name: new URL(json.website).hostname,
        url: json.website,
        fullUrl: true,
      });

    setSocials(toSet);
  }, []);

  const getSocials = useCallback(() => {
    fetch(`http://localhost:3000/user/${props.userId}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((json) => setupSocials(json))
      .finally(() => {
        props.showSpinner(false);
        setIsLoaded(true);
      });
  }, [setupSocials, props]);

  useEffect(() => {
    getSocials();
  }, [props, getSocials]);

  return (
    <>
      <p>Social media</p>
      {isLoaded && (
        <ul>
          {socials && socials.length !== 0 ? (
            socials.map((elem, key) => {
              return (
                <li key={key}>
                  <SocialElement
                    icon={elem.icon}
                    name={elem.name}
                    url={elem.url}
                    fullUrl={elem.fullUrl}
                  />
                </li>
              );
            })
          ) : (
            <p>Brak linków do mediów społecznościowych użytkownika</p>
          )}
        </ul>
      )}
    </>
  );
};

export default SocialsModal;
